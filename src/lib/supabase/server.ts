import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".noratech.com.br";

export async function getSupabaseServer() {
  const jar = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (list) => {
          for (const { name, value, options } of list) {
            try {
              jar.set(name, value, { ...options, domain: COOKIE_DOMAIN });
            } catch {
              // setAll runs from Server Components where cookies are read-only;
              // mutations via Server Actions / Route Handlers will hit the writable jar.
            }
          }
        },
      },
    },
  );
}
