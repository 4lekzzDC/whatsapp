-- ============================================================
-- WhatsApp Bot — Schema Postgres
--
-- Rode uma vez depois de criar o banco:
--   psql -h localhost -U whatsapp -d whatsapp -f db/schema.sql
--
-- Seguro para reaplicar: usa CREATE ... IF NOT EXISTS.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto; -- para gen_random_uuid()

-- ---------------- Tenants ----------------

CREATE TABLE IF NOT EXISTS tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Users ----------------

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'operator'
                  CHECK (role IN ('admin','supervisor','operator')),
  status        TEXT NOT NULL DEFAULT 'offline'
                  CHECK (status IN ('online','away','offline')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Sectors ----------------

CREATE TABLE IF NOT EXISTS sectors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  greeting      TEXT,
  color         TEXT DEFAULT '#25D366',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, name)
);

CREATE TABLE IF NOT EXISTS user_sectors (
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sector_id     UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, sector_id)
);

-- ---------------- WhatsApp connections ----------------
-- Uma conexão = um número Cloud API ligado ao tenant.
-- Pode ter várias (ex.: comercial, suporte).

CREATE TABLE IF NOT EXISTS whatsapp_connections (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id             UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  provider              TEXT NOT NULL DEFAULT 'cloud_api'
                          CHECK (provider IN ('cloud_api','baileys')),
  phone_number_id       TEXT NOT NULL UNIQUE,
  waba_id               TEXT,
  display_phone_number  TEXT,
  name                  TEXT NOT NULL,
  sector_id             UUID REFERENCES sectors(id) ON DELETE SET NULL,
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','connected','disconnected','error')),
  last_seen_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Contacts ----------------

CREATE TABLE IF NOT EXISTS contacts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  wa_id         TEXT NOT NULL, -- E.164 sem '+', ex: "5551998765432"
  name          TEXT,
  email         TEXT,
  tags          TEXT[] NOT NULL DEFAULT '{}',
  metadata      JSONB NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, wa_id)
);

CREATE INDEX IF NOT EXISTS idx_contacts_tenant ON contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contacts_tags ON contacts USING GIN (tags);

-- ---------------- Tickets ----------------
-- Um ticket = uma conversa ativa entre contato e empresa.
-- Quando resolvido/reaberto, mantemos o mesmo id.

CREATE TABLE IF NOT EXISTS tickets (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  contact_id        UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  connection_id    UUID NOT NULL REFERENCES whatsapp_connections(id),
  sector_id         UUID REFERENCES sectors(id),
  assigned_user_id  UUID REFERENCES users(id),
  status            TEXT NOT NULL DEFAULT 'open'
                      CHECK (status IN ('open','pending','resolved')),
  subject           TEXT,
  last_message_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_read_by_operator_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at       TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_tickets_tenant_status ON tickets(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_tickets_last_message ON tickets(tenant_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_sector ON tickets(tenant_id, sector_id);
CREATE INDEX IF NOT EXISTS idx_tickets_assignee ON tickets(tenant_id, assigned_user_id);

-- ---------------- Messages ----------------

CREATE TABLE IF NOT EXISTS messages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id         UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  direction         TEXT NOT NULL CHECK (direction IN ('in','out')),
  sender            TEXT NOT NULL CHECK (sender IN ('contact','operator','bot','system')),
  sender_user_id    UUID REFERENCES users(id),
  wa_message_id     TEXT UNIQUE, -- id do Meta (evita duplicação no webhook)
  reply_to_wa_id    TEXT,
  type              TEXT NOT NULL DEFAULT 'text'
                      CHECK (type IN ('text','image','document','audio','video','sticker','location','contacts','template','interactive','reaction','system')),
  body              TEXT,
  media_url         TEXT,
  media_mime        TEXT,
  media_sha256      TEXT,
  payload           JSONB, -- payload bruto quando tipo complexo (interactive, template...)
  status            TEXT CHECK (status IN ('sent','delivered','read','failed')),
  error             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_ticket ON messages(ticket_id, created_at);

-- ---------------- Quick replies ----------------

CREATE TABLE IF NOT EXISTS quick_replies (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  shortcut      TEXT NOT NULL,
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  uses_count    INT  NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, shortcut)
);

-- ---------------- Flows ----------------

CREATE TABLE IF NOT EXISTS flows (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  active        BOOLEAN NOT NULL DEFAULT false,
  nodes         JSONB NOT NULL DEFAULT '[]'::jsonb,
  edges         JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Campaigns ----------------

CREATE TABLE IF NOT EXISTS campaigns (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  connection_id       UUID REFERENCES whatsapp_connections(id),
  name                TEXT NOT NULL,
  template_name       TEXT,
  template_language   TEXT DEFAULT 'pt_BR',
  template_vars       JSONB NOT NULL DEFAULT '{}'::jsonb,
  audience_filter     JSONB NOT NULL DEFAULT '{}'::jsonb,
  status              TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft','scheduled','running','done','failed')),
  scheduled_at        TIMESTAMPTZ,
  sent_count          INT NOT NULL DEFAULT 0,
  failed_count        INT NOT NULL DEFAULT 0,
  target_count        INT NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Webhook audit ----------------
-- Guarda o payload bruto para:
--   1. idempotência (não processar o mesmo evento 2x)
--   2. debug quando algo não cair no lugar certo

CREATE TABLE IF NOT EXISTS webhook_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source        TEXT NOT NULL DEFAULT 'whatsapp',
  event_id      TEXT, -- id do Meta quando disponível
  payload       JSONB NOT NULL,
  processed_at  TIMESTAMPTZ,
  error         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_created ON webhook_events(created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_webhook_events_event_id ON webhook_events(event_id)
  WHERE event_id IS NOT NULL;

-- ---------------- Templates (cache dos templates aprovados no Meta) ----------------

CREATE TABLE IF NOT EXISTS message_templates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  waba_id       TEXT NOT NULL,
  name          TEXT NOT NULL,
  language      TEXT NOT NULL DEFAULT 'pt_BR',
  category      TEXT,
  status        TEXT, -- APPROVED / PENDING / REJECTED
  components    JSONB NOT NULL,
  synced_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (waba_id, name, language)
);

-- ---------------- Seed mínimo ----------------
-- Cria um tenant de exemplo quando vazio. Útil para o primeiro deploy.

INSERT INTO tenants (id, name)
SELECT gen_random_uuid(), 'Noratech'
WHERE NOT EXISTS (SELECT 1 FROM tenants);
