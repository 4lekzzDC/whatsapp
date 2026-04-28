# Deploy do Falahub na VPS Hostinger

App Next.js servido em `https://falahub.noratech.com.br`, rodando atrás de Nginx
+ TLS Let's Encrypt + systemd. Auth/SSO via cookie compartilhado do Supabase do
Noratech (ver `noratech-side.md` para o que precisa estar configurado no outro
repo).

> **VPS:** `72.61.56.69` — apontar `A falahub.noratech.com.br` para esse IP.

## Layout em produção

```
/srv/falahub/
  repo/          # git checkout (origin: github.com/4lekzzDC/whatsapp)
  shared/.env    # variáveis de ambiente (não tocadas pelo deploy)
  releases/<ts>/ # cada deploy fica aqui; mantemos as 5 últimas
  current/       # symlink -> releases/<ts>/.next-standalone (workdir do systemd)
```

Usuário de serviço: `falahub` (sem login). systemd unit: `falahub-app.service`.

## Bootstrap (rodar uma vez na VPS, como root)

### 1. DNS

Antes de tudo: criar `A falahub.noratech.com.br -> 72.61.56.69` (TTL 300).
Aguardar `dig +short falahub.noratech.com.br` retornar o IP.

### 2. Pacotes e usuário

```bash
adduser --disabled-password --gecos "" falahub
mkdir -p /srv/falahub/{repo,releases,shared}
chown -R falahub:falahub /srv/falahub

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs nginx certbot python3-certbot-nginx git
```

### 3. Repo + .env

```bash
sudo -u falahub git clone https://github.com/4lekzzDC/whatsapp /srv/falahub/repo
```

Criar `/srv/falahub/shared/.env` (modo `600`, owner `falahub`). Use
`/srv/falahub/repo/.env.example` como referência. Os valores de
`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são **os mesmos**
do projeto Supabase usado pelo Noratech.

```bash
sudo -u falahub install -m 600 /dev/stdin /srv/falahub/shared/.env <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_APP_URL=https://falahub.noratech.com.br
NEXT_PUBLIC_NORATECH_URL=https://noratech.com.br
NEXT_PUBLIC_COOKIE_DOMAIN=.noratech.com.br
FALAHUB_REQUIRE_ENTITLEMENT=false
NODE_ENV=production
PORT=3000
HOSTNAME=127.0.0.1
EOF
```

### 4. systemd

```bash
cp /srv/falahub/repo/deploy/systemd/falahub-app.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable falahub-app
```

(Não inicie ainda — o `current/` symlink ainda não existe; o primeiro deploy
abaixo faz isso.)

### 5. Nginx + TLS

```bash
cp /srv/falahub/repo/deploy/nginx/falahub.noratech.com.br.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/falahub.noratech.com.br.conf /etc/nginx/sites-enabled/
nginx -t

# Emite o cert. Como o site não está "no ar" ainda, usar webroot ou modo standalone:
systemctl stop nginx
certbot certonly --standalone -d falahub.noratech.com.br \
    --agree-tos -m ops@noratech.com.br -n
systemctl start nginx
nginx -t && systemctl reload nginx
```

### 6. Primeiro deploy

```bash
sudo -u falahub bash /srv/falahub/repo/deploy/scripts/deploy.sh
systemctl status falahub-app --no-pager
curl -I https://falahub.noratech.com.br/healthz
```

## Deploy subsequente

```bash
sudo -u falahub bash /srv/falahub/repo/deploy/scripts/deploy.sh
```

O script faz `git fetch + reset` em `repo/`, monta um release novo em
`releases/<ts>/`, instala deps, builda em modo `standalone`, ativa o symlink
`current/` e reinicia o systemd. As 5 últimas releases ficam para rollback.

Para mudar de branch: `DEPLOY_BRANCH=feature/foo bash deploy.sh`.

## Rollback

```bash
ls -1dt /srv/falahub/releases/
sudo -u falahub ln -sfn /srv/falahub/releases/<release-anterior>/.next-standalone /srv/falahub/current
sudo systemctl restart falahub-app
```

## Logs

```bash
journalctl -u falahub-app -f
journalctl -u falahub-app --since "5 min ago"
tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```

## Renovação de certificado

`certbot` é instalado com timer. Verificar:

```bash
systemctl list-timers | grep certbot
certbot renew --dry-run
```
