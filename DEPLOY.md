# Deploy do FalaHub

Guia passo-a-passo para colocar o painel no ar em uma VPS Ubuntu 24.04 LTS,
servido sob `https://noratech.com.br/painel/falahub`.

**Arquitetura:**

- VPS Hostinger ouve em `app.noratech.com.br` (subdomain dedicado, A record
  pra IP da VPS).
- App Next.js roda na VPS com `basePath=/painel/falahub`.
- O site institucional `noratech.com.br` (Vercel, repo separado) faz **rewrite**
  do path `/painel/falahub/*` para `https://app.noratech.com.br/painel/falahub/*`.
  O usuário nunca vê o subdomain — fica em `noratech.com.br/painel/falahub`.
- Webhook do Meta vai **direto** para `app.noratech.com.br`, sem passar pelo
  Vercel.

---

## 0. Pré-requisitos

- [ ] VPS Ubuntu 24.04 LTS com IP público (acesso root via SSH)
- [ ] Domínio `noratech.com.br` (DNS gerenciado em algum provedor)
- [ ] Acesso ao repo Vercel `noratech.com.br` (pra adicionar o rewrite)
- [ ] Conta em [business.facebook.com](https://business.facebook.com) (KYC
      da empresa, leva 1–3 dias)
- [ ] App criado em [developers.facebook.com](https://developers.facebook.com)
  → produto **WhatsApp** adicionado
- [ ] Número de teste grátis do Meta (já vem junto ao criar o app)

---

## 1. DNS — apontar `app.noratech.com.br` para a VPS

Pegue o IP público da VPS e adicione um A record:

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| A | `app.noratech.com.br` | `IP.DA.VPS` | 3600 |

**Não mexe no `@` nem no `www`** — eles continuam apontando pro Vercel.

Espere ~5 min e teste: `dig app.noratech.com.br +short` deve retornar o IP.

---

## 2. Bootstrap da VPS

SSH como root e rode o script:

```bash
ssh root@IP.DA.VPS
git clone https://github.com/4lekzzDC/whatsapp.git /tmp/whatsapp
sudo bash /tmp/whatsapp/deploy/setup.sh
```

O script instala: Node 22, Postgres 16, nginx, Certbot, PM2, ufw, fail2ban.
Cria o usuário `app`, o database `whatsapp` e gera uma senha aleatória.

As credenciais geradas ficam em `/root/whatsapp-bootstrap.txt` — **leia esse
arquivo e guarde a `DATABASE_URL`**.

---

## 3. Clonar e configurar o app

```bash
su - app
git clone https://github.com/4lekzzDC/whatsapp.git ~/whatsapp
cd ~/whatsapp

cp .env.example .env
nano .env   # preencha DATABASE_URL e as credenciais do Meta (ver passo 4)

npm ci
npm run build
```

Rode as migrações (idempotente):

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Crie o primeiro usuário admin pra conseguir logar:

```bash
npm run seed -- --email seu@email.com --name "Seu Nome" --password 'algo-forte'
```

---

## 4. Cloud API no Meta — credenciais

Em [developers.facebook.com](https://developers.facebook.com) → seu App →
**WhatsApp › API Setup**:

1. Copie o **Phone number ID** (número de teste).
2. Copie o **WhatsApp Business Account ID**.
3. Clique em **Generate access token** e copie o token de **System User**
   (permanente). O token temporário de 24h não serve em produção.
4. Em **Configurações › Básico**, revele a **Chave Secreta do App** e copie.
5. Invente um **Verify Token** qualquer (string forte) — você vai usar nos
   dois lugares: no `.env` (`WHATSAPP_WEBHOOK_VERIFY_TOKEN`) e no painel
   do Meta na hora de cadastrar o webhook.

Preencha `.env`:

```env
BASE_PATH=/painel/falahub
APP_URL=https://noratech.com.br/painel/falahub
JWT_SECRET=<openssl rand -hex 64>
DATABASE_URL=postgres://whatsapp:SENHA@127.0.0.1:5432/whatsapp

WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_BUSINESS_ACCOUNT_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_WEBHOOK_VERIFY_TOKEN=algo_forte_que_voce_inventa
WHATSAPP_APP_SECRET=...
WHATSAPP_GRAPH_VERSION=v21.0
```

> **Importante:** `BASE_PATH` é lido em build time. Se você alterar, é
> obrigatório rodar `npm run build` de novo.

---

## 5. Subir no PM2

```bash
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 logs whatsapp-bot   # confere que subiu sem erro
```

Neste ponto o app está ouvindo em `127.0.0.1:3000` (não exposto ainda).

---

## 6. nginx + SSL

Como root:

```bash
cp /home/app/whatsapp/deploy/nginx.example.conf \
   /etc/nginx/sites-available/app.noratech.com.br
ln -s /etc/nginx/sites-available/app.noratech.com.br \
      /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

certbot --nginx -d app.noratech.com.br
```

Teste direto: `curl -I https://app.noratech.com.br/painel/falahub/` deve
retornar 200.

---

## 7. Vercel rewrite no `noratech.com.br`

No repo **separado** do site institucional (que está hospedado no Vercel),
edite `next.config.ts` (ou crie um `vercel.json`):

**Opção A — `next.config.ts`:**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/painel/falahub/:path*",
        destination: "https://app.noratech.com.br/painel/falahub/:path*",
      },
    ];
  },
};

export default nextConfig;
```

**Opção B — `vercel.json`:**

```json
{
  "rewrites": [
    {
      "source": "/painel/falahub/:path*",
      "destination": "https://app.noratech.com.br/painel/falahub/:path*"
    }
  ]
}
```

Commit + push. O Vercel faz redeploy sozinho. Depois teste:

```bash
curl -I https://noratech.com.br/painel/falahub/
# Deve responder 200 (mesmo header X-Powered-By: Next.js que vem da VPS)
```

---

## 8. Webhook no Meta

Painel do App no Meta → **WhatsApp › Configuration › Webhook**:

- **Callback URL:** `https://app.noratech.com.br/painel/falahub/api/webhooks/whatsapp`
  > URL **direta da VPS**, sem o `noratech.com.br`. Webhooks são
  > server-to-server e ganham confiabilidade evitando o proxy do Vercel.
- **Verify token:** o mesmo que você pôs em `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- Clique em **Verify and save** — se der 200, tá ligado.

Depois, clique em **Manage** ao lado de `whatsapp_business_account` e
assine o evento `messages`.

---

## 9. Primeiro teste

Ainda em **API Setup**, adicione seu próprio número na seção
**To: Add phone number** (o Meta precisa aprovar com um código por SMS
que ele te envia).

Mande uma mensagem qualquer do seu WhatsApp pessoal para o número de teste.
Na VPS:

```bash
pm2 logs whatsapp-bot
```

Você deve ver `[webhook] N eventos recebidos`. Isso prova que todo o caminho
`WhatsApp → Meta → webhook → seu app` está funcionando.

Para conferir o payload bruto persistido:

```bash
psql "$DATABASE_URL" -c \
  "SELECT created_at, payload->'entry' FROM webhook_events ORDER BY created_at DESC LIMIT 1;"
```

Para acessar o painel pelo browser:

```
https://noratech.com.br/painel/falahub/entrar
```

Logue com o usuário criado no `npm run seed`.

---

## 10. Rotina de operação

**Atualizar app após push novo:**

```bash
su - app
cd ~/whatsapp
git pull
npm ci
npm run build
pm2 reload whatsapp-bot
```

**Ver logs:**

```bash
pm2 logs whatsapp-bot --lines 200
```

**Rotacionar access token do Meta:**

1. Gere novo token em API Setup.
2. Edite `.env`.
3. `pm2 reload whatsapp-bot`.

**Renovar SSL:** o Certbot já instala um timer automático. Confira com
`systemctl status certbot.timer`.

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| `GET /api/webhooks/whatsapp → 403` | `hub.verify_token` diferente de `.env` | Iguale os dois e salve de novo |
| `POST /api/webhooks/whatsapp → 401` | `WHATSAPP_APP_SECRET` errado | Copie do Meta, sem espaços |
| "Graph API 190" nos logs | Access token expirou ou foi revogado | Gere novo token de System User |
| Webhook salva 200 mas nada aparece na UI | Processamento ainda é mock (próxima fase) | Normal neste estágio |
| `ECONNREFUSED 5432` | Postgres não subiu | `systemctl status postgresql` |
| `noratech.com.br/painel/falahub` dá 404 | Rewrite Vercel ainda não subiu | Confirma deploy do site institucional |
| Login pelo Vercel funciona mas painel some | Cookie do BASE_PATH não está chegando | Confere `Path=/painel/falahub` no DevTools |
| Acessou `app.noratech.com.br` direto e fez login | Cookie fica preso no subdomain, não vai pro `noratech.com.br` | Sempre acesse pela URL canônica `noratech.com.br/painel/falahub` |

---

## Próximas fases (já codadas parcialmente, faltam ligar)

- [ ] Autenticação real (bcrypt + JWT) — substitui o cookie stub atual
- [ ] Persistência granular dos tickets/mensagens no banco (hoje só
      `webhook_events` é gravado)
- [ ] SSE para atualização em tempo real do painel
- [ ] Upload e download de mídia via `graph.facebook.com/<media_id>`
- [ ] Templates: cache local + envio em campanhas
- [ ] Provider rename: `WhatsAppProvider` → `MessagingProvider` + adapters
      Instagram (Graph API) e Telegram (Bot API). Schema já suporta via
      `connections.provider`.
