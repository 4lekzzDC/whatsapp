# Deploy do WhatsApp Bot

Guia passo-a-passo para colocar o painel no ar em um VPS Ubuntu 24.04 com
domínio próprio e Cloud API oficial do WhatsApp.

**Alvo deste guia:** `painel.noratech.com.br` em Hetzner/Hostinger.

---

## 0. Pré-requisitos

- [ ] VPS Ubuntu 24.04 com IP público (acesso root via SSH)
- [ ] Domínio próprio (`noratech.com.br`)
- [ ] Conta em [business.facebook.com](https://business.facebook.com)
- [ ] App criado em [developers.facebook.com](https://developers.facebook.com)
  → produto **WhatsApp** adicionado
- [ ] Número de teste grátis do Meta (já vem junto ao criar o app)

---

## 1. DNS — apontar o domínio para o VPS

Pegue o IP público do VPS e crie dois `A records`:

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| A | `noratech.com.br` | `IP.DO.VPS` | 3600 |
| A | `painel.noratech.com.br` | `IP.DO.VPS` | 3600 |

Espere ~5 min e teste: `dig painel.noratech.com.br +short` deve retornar o IP.

---

## 2. Bootstrap do VPS

SSH como root e rode o script:

```bash
ssh root@IP.DO.VPS
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

Rode as migrações:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

---

## 4. Cloud API no Meta — credenciais

Em [developers.facebook.com](https://developers.facebook.com) → seu App → **WhatsApp › API Setup**:

1. Copie o **Phone number ID** (número de teste).
2. Copie o **WhatsApp Business Account ID**.
3. Clique em **Generate access token** e copie o token de **System User**
   (permanente). O token temporário de 24h não serve em produção.
4. Em **Configurações › Básico**, revele a **Chave Secreta do App** e copie.
5. Invente um **Verify Token** qualquer (uma string forte) — você vai usar
   em dois lugares: no `.env` (`WHATSAPP_WEBHOOK_VERIFY_TOKEN`) e no painel
   do Meta na hora de cadastrar o webhook.

Preencha `.env`:

```env
APP_URL=https://painel.noratech.com.br
JWT_SECRET=<openssl rand -hex 64>
DATABASE_URL=postgres://whatsapp:SENHA@127.0.0.1:5432/whatsapp

WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_BUSINESS_ACCOUNT_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_WEBHOOK_VERIFY_TOKEN=algo_forte_que_voce_inventa
WHATSAPP_APP_SECRET=...
WHATSAPP_GRAPH_VERSION=v21.0
```

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
cp /home/app/whatsapp/deploy/nginx.noratech.conf.example \
   /etc/nginx/sites-available/painel.noratech.com.br
ln -s /etc/nginx/sites-available/painel.noratech.com.br \
      /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

certbot --nginx -d painel.noratech.com.br
```

Acesse `https://painel.noratech.com.br` — deve carregar a tela de login.

---

## 7. Webhook no Meta

Volte ao painel do App no Meta → **WhatsApp › Configuration › Webhook**:

- **Callback URL:** `https://painel.noratech.com.br/api/webhooks/whatsapp`
- **Verify token:** o mesmo que você pôs em `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- Clique em **Verify and save** — se der 200, tá ligado.

Depois, clique em **Manage** ao lado de `whatsapp_business_account` e
assine o evento `messages`.

---

## 8. Primeiro teste

Ainda em **API Setup**, adicione seu próprio número na seção
**To: Add phone number** (o Meta precisa aprovar com um código por SMS
que ele te envia).

Mande uma mensagem qualquer do seu WhatsApp pessoal para o número de teste.
No VPS:

```bash
pm2 logs whatsapp-bot
```

Você deve ver `[webhook] N eventos recebidos`. Isso prova que todo o caminho
`WhatsApp → Meta → webhook → seu app` está funcionando.

---

## 9. Rotina de operação

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

---

## Próximas fases (já codadas parcialmente, faltam ligar)

- [ ] Autenticação real (bcrypt + JWT) — substitui o cookie stub
- [ ] Persistência real dos tickets/mensagens no banco
- [ ] SSE para atualização em tempo real do painel
- [ ] Upload e download de mídia via `graph.facebook.com/<media_id>`
- [ ] Templates: cache local + envio em campanhas
