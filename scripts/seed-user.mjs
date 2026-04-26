#!/usr/bin/env node
// Cria o primeiro usuário admin do FalaHub.
//
// Uso:
//   npm run seed -- --email admin@exemplo.com --name "Admin" --password 'SenhaForte!'
//
// Pré-requisitos: DATABASE_URL setado no .env, db/schema.sql já aplicado
// (a tabela `tenants` precisa ter pelo menos 1 linha — o schema já faz seed
// do tenant inicial 'Noratech').

import { parseArgs } from "node:util";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";
import pg from "pg";

function loadDotenv() {
  // Carrega .env manualmente (evita dependência extra). Só sobrescreve o que
  // ainda não está no process.env, pra respeitar variáveis passadas no shell.
  try {
    const text = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch {
    // .env não existe — segue só com process.env
  }
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function main() {
  loadDotenv();

  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      name: { type: "string" },
      password: { type: "string" },
      role: { type: "string", default: "admin" },
    },
    allowPositionals: false,
  });

  if (!values.email) fail("--email obrigatório");
  if (!values.name) fail("--name obrigatório");
  if (!values.password) fail("--password obrigatório");
  if (values.password.length < 8) fail("--password precisa ter ao menos 8 caracteres");
  if (!["admin", "supervisor", "operator"].includes(values.role)) {
    fail(`--role precisa ser admin|supervisor|operator (recebido: ${values.role})`);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) fail("DATABASE_URL não configurado (verifique .env)");

  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    const tenant = await client.query("SELECT id FROM tenants ORDER BY created_at LIMIT 1");
    if (tenant.rows.length === 0) {
      fail("Nenhum tenant encontrado. Aplique db/schema.sql primeiro.");
    }
    const tenantId = tenant.rows[0].id;

    const existing = await client.query("SELECT id FROM users WHERE email = $1", [values.email]);
    if (existing.rows.length > 0) {
      fail(`Já existe usuário com email ${values.email} (id=${existing.rows[0].id}).`);
    }

    const hash = await bcrypt.hash(values.password, 10);
    const result = await client.query(
      `INSERT INTO users (tenant_id, email, password_hash, name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, role`,
      [tenantId, values.email, hash, values.name, values.role]
    );
    const user = result.rows[0];

    console.log(`✓ Usuário criado:`);
    console.log(`  id:    ${user.id}`);
    console.log(`  email: ${user.email}`);
    console.log(`  name:  ${user.name}`);
    console.log(`  role:  ${user.role}`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("✗ Erro:", err.message || err);
  process.exit(1);
});
