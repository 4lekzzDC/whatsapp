"use client";

import { createContext, useContext, type ReactNode } from "react";

export type AppUser = {
  name: string;
  email: string;
  initials: string;
};

const Ctx = createContext<AppUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: AppUser;
  children: ReactNode;
}) {
  return <Ctx.Provider value={user}>{children}</Ctx.Provider>;
}

export function useUser(): AppUser {
  const u = useContext(Ctx);
  if (!u) throw new Error("useUser fora do UserProvider");
  return u;
}
