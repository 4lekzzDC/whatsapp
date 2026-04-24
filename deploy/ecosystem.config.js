// PM2 ecosystem — WhatsApp Bot
//
// Uso:  pm2 start deploy/ecosystem.config.js
//       pm2 save
//       pm2 logs whatsapp-bot
//
// Em VPS pequeno (2 GB RAM) deixar instances=1 e evitar cluster do Next.js.

module.exports = {
  apps: [
    {
      name: "whatsapp-bot",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/home/app/whatsapp",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "1G",
      out_file: "/home/app/whatsapp/.pm2/out.log",
      error_file: "/home/app/whatsapp/.pm2/error.log",
      merge_logs: true,
      time: true,
      autorestart: true,
      watch: false,
    },
  ],
};
