import type { NextConfig } from "next";

// `BASE_PATH` é lido em tempo de build. Deixa vazio em dev
// (app fica em http://localhost:3000/) e em produção é setado para
// "/painel/falahub" antes do build:
//
//   BASE_PATH=/painel/falahub npm run build
//
// Valor permitido: "" ou "/algum-path" (sem barra no final).
const basePath = process.env.BASE_PATH?.trim() || "";
if (basePath && !basePath.startsWith("/")) {
  throw new Error(`BASE_PATH precisa começar com "/" (recebido: "${basePath}")`);
}
if (basePath.endsWith("/")) {
  throw new Error(`BASE_PATH não pode terminar com "/" (recebido: "${basePath}")`);
}

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  // Expõe o basePath pro cliente (útil para cookies, fetches explícitos
  // e o scope de cookie ficar dentro de /painel/falahub em vez de /).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
