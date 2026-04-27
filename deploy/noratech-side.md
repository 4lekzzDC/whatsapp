# O que ajustar no repo / projeto do Noratech

O Falahub (`falahub.noratech.com.br`) **não tem login próprio** — ele lê a
sessão Supabase gravada pelo `noratech.com.br`. Para o SSO funcionar, três
coisas precisam estar no lugar do lado do Noratech.

## 1. Cookie de sessão Supabase no domínio pai

No cliente `@supabase/ssr` do Noratech (server e browser), o cookie precisa ser
gravado em `.noratech.com.br` para que `falahub.noratech.com.br` consiga ler.

```ts
// no createServerClient / createBrowserClient do Noratech:
createServerClient(url, anon, {
  cookies: { /* ... */ },
  cookieOptions: {
    domain: ".noratech.com.br",
    sameSite: "lax",
    secure: true,
    path: "/",
  },
});
```

**Como confirmar que está OK:** logar em `noratech.com.br`, abrir DevTools →
Application → Cookies. Os cookies `sb-<ref>-auth-token` (e variações
`sb-<ref>-auth-token.0`, `.1`, …) devem ter `Domain=.noratech.com.br`,
`HttpOnly`, `Secure`, `SameSite=Lax`. Se aparecer `Domain=noratech.com.br` (sem
ponto), não vai funcionar — é preciso ajustar e relogar para o cookie ser
reescrito.

## 2. Redirect URLs no Supabase Auth

No painel Supabase do projeto: **Authentication → URL Configuration → Redirect
URLs**. Adicionar:

```
https://falahub.noratech.com.br
https://falahub.noratech.com.br/painel/atendimentos
```

(Não é estritamente necessário hoje, porque não fazemos OAuth callback no
Falahub, mas adiantamos para magic-link / OAuth futuros.)

## 3. Tabela de "soluções contratadas"

Hoje só existe `public.profiles`. O Falahub precisa saber **quem tem o produto
contratado**. Rode no SQL Editor do Supabase do Noratech:

```sql
create table if not exists public.entitlements (
  user_id    uuid not null references auth.users on delete cascade,
  product    text not null,                              -- ex: 'falahub'
  status     text not null default 'active'              -- 'active' | 'trial' | 'suspended' | 'canceled'
             check (status in ('active','trial','suspended','canceled')),
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  primary key (user_id, product)
);

alter table public.entitlements enable row level security;

create policy "self read" on public.entitlements
  for select using (auth.uid() = user_id);
```

Quando essa tabela estiver populada, ligar a checagem no Falahub trocando, no
`/srv/falahub/shared/.env`:

```
FALAHUB_REQUIRE_ENTITLEMENT=true
```

…e `systemctl restart falahub-app`. Enquanto a flag estiver `false`, qualquer
usuário logado no Noratech entra no painel.

Para liberar manualmente um usuário durante o desenvolvimento:

```sql
insert into public.entitlements (user_id, product, status)
values ('<uid>', 'falahub', 'active')
on conflict (user_id, product) do update set status = 'active';
```

## 4. Botão "Utilizar aplicação" no portal

No dashboard do portal Noratech, o botão para abrir o Falahub deve ser um
link absoluto:

```html
<a href="https://falahub.noratech.com.br/painel/atendimentos">Utilizar aplicação</a>
```

Não passar token nem nada na URL — a sessão viaja só pelo cookie compartilhado.

## 5. Página de login: aceitar `?next=`

O Falahub redireciona usuários sem sessão para
`https://noratech.com.br/entrar?next=https://falahub.noratech.com.br/painel/<…>`.

Se o login do Noratech não respeita `?next=`, o usuário vai parar no portal em
vez de voltar para o Falahub. Recomenda-se que o `entrar` do Noratech, após
sucesso, faça `redirect(searchParams.next ?? "/portal")` — validando que o host
de `next` está em uma allowlist (ex.: termina em `.noratech.com.br`).

## 6. Logout

O Falahub faz `supabase.auth.signOut()` quando o usuário clica em "Sair", o que
apaga o cookie compartilhado em `.noratech.com.br`. Em seguida, redireciona
para `https://noratech.com.br/entrar`. Não é preciso criar rota de logout
nova no Noratech.
