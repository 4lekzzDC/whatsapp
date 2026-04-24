#!/usr/bin/env bash
# ============================================================
# WhatsApp Bot — VPS bootstrap
#
# Testado em Ubuntu 24.04 LTS (Hetzner / Hostinger).
# Rode UMA ÚNICA VEZ logado como root no servidor novo:
#
#   curl -fsSL https://raw.githubusercontent.com/<org>/<repo>/main/deploy/setup.sh | bash
#
# Ou clone o repo e:  sudo bash deploy/setup.sh
#
# O que ele faz:
#  1. Atualiza o sistema
#  2. Cria um usuário "app" sem sudo
#  3. Instala Node.js 22 LTS, Postgres 16, nginx, Certbot, PM2, ufw, fail2ban
#  4. Cria database + user do Postgres
#  5. Configura firewall (permite só 22, 80, 443)
#  6. Deixa a caixa pronta para clonar o repo em /home/app/whatsapp
# ============================================================

set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Rode como root: sudo bash $0" >&2
  exit 1
fi

# -------- Config editável --------
APP_USER="${APP_USER:-app}"
APP_DIR="/home/${APP_USER}/whatsapp"
DB_NAME="${DB_NAME:-whatsapp}"
DB_USER="${DB_USER:-whatsapp}"
DB_PASS="${DB_PASS:-$(openssl rand -hex 24)}"
NODE_MAJOR="${NODE_MAJOR:-22}"
# ---------------------------------

log() { printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }

log "Atualizando o sistema"
apt-get update -y
apt-get upgrade -y
apt-get install -y curl ca-certificates gnupg git ufw fail2ban build-essential

log "Criando usuário ${APP_USER} (sem sudo)"
if ! id "${APP_USER}" &>/dev/null; then
  adduser --disabled-password --gecos "" "${APP_USER}"
fi

log "Firewall (UFW): permite só SSH + HTTP + HTTPS"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

log "fail2ban para mitigar brute-force SSH"
systemctl enable --now fail2ban

log "Instalando Node.js ${NODE_MAJOR} via NodeSource"
curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
apt-get install -y nodejs
node -v
npm -v

log "Instalando PM2"
npm install -g pm2
pm2 startup systemd -u "${APP_USER}" --hp "/home/${APP_USER}" | tail -n1 | bash || true

log "Instalando Postgres 16"
apt-get install -y postgresql postgresql-contrib

log "Criando database '${DB_NAME}' e usuário '${DB_USER}'"
sudo -u postgres psql <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;

CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
SQL

log "Instalando nginx + Certbot"
apt-get install -y nginx certbot python3-certbot-nginx
systemctl enable --now nginx

log "Preparando pasta do app em ${APP_DIR}"
sudo -u "${APP_USER}" mkdir -p "${APP_DIR}"

log "Escrevendo credenciais temporárias em /root/whatsapp-bootstrap.txt"
cat > /root/whatsapp-bootstrap.txt <<CREDS
==============================================
WhatsApp Bot — credenciais geradas
==============================================

Postgres:
  Database:  ${DB_NAME}
  User:      ${DB_USER}
  Password:  ${DB_PASS}
  Host:      127.0.0.1
  Port:      5432

DATABASE_URL para o .env:
  postgres://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}

Próximos passos:
  1. su - ${APP_USER}
  2. cd ${APP_DIR}
  3. git clone <repo-url> .
  4. cp .env.example .env  (e preencha com a DATABASE_URL acima + credenciais do Meta)
  5. npm ci && npm run build
  6. psql "\$DATABASE_URL" -f db/schema.sql
  7. pm2 start deploy/ecosystem.config.js
  8. pm2 save
  9. Copie deploy/nginx.noratech.conf.example para /etc/nginx/sites-available/
     (troque o server_name se precisar, depois faça um symlink em sites-enabled/)
  10. certbot --nginx -d painel.noratech.com.br
==============================================
CREDS
chmod 600 /root/whatsapp-bootstrap.txt

log "Pronto! Leia /root/whatsapp-bootstrap.txt para os próximos passos."
