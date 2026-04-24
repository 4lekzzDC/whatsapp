"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Inbox,
  Smartphone,
  Users,
  Building2,
  UserCog,
  Zap,
  Workflow,
  BarChart3,
  Settings,
  Megaphone,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { useT } from "../LocaleProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const t = useT();

  const nav = [
    {
      section: t("panel.operation"),
      items: [
        { href: "/painel/atendimentos", label: t("panel.tickets"), icon: Inbox, badge: "3" },
        { href: "/painel/contatos", label: t("panel.contacts"), icon: Users },
        { href: "/painel/campanhas", label: t("panel.campaigns"), icon: Megaphone },
      ],
    },
    {
      section: t("panel.automation"),
      items: [
        { href: "/painel/fluxos", label: t("panel.flows"), icon: Workflow },
        { href: "/painel/respostas-rapidas", label: t("panel.quickReplies"), icon: Zap },
      ],
    },
    {
      section: t("panel.management"),
      items: [
        { href: "/painel/setores", label: t("panel.sectors"), icon: Building2 },
        { href: "/painel/usuarios", label: t("panel.users"), icon: UserCog },
        { href: "/painel/relatorios", label: t("panel.reports"), icon: BarChart3 },
      ],
    },
    {
      section: t("panel.system"),
      items: [
        { href: "/painel/whatsapp", label: t("panel.connections"), icon: Smartphone },
        { href: "/painel/configuracoes", label: t("panel.settings"), icon: Settings },
        { href: "/painel/ajuda", label: t("panel.help"), icon: BookOpen },
      ],
    },
  ];

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/5 bg-card-bg/40">
      <Link href="/" className="flex items-center gap-2 h-16 px-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-green-primary/20 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-green-primary" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight">WhatsApp Bot</p>
          <p className="text-[10px] text-text-muted leading-tight">{t("panel.customerPanel")}</p>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {nav.map((group) => (
          <div key={group.section}>
            <p className="px-3 pb-2 text-[10px] uppercase tracking-wider text-text-muted font-semibold">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-green-primary/15 text-green-primary"
                          : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold bg-green-primary text-black px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {active && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/5 p-4">
        <div className="rounded-xl bg-gradient-to-br from-green-primary/15 to-green-dark/10 p-4 border border-green-primary/20">
          <p className="text-xs font-semibold text-green-primary mb-1">{t("panel.planPro")}</p>
          <p className="text-[11px] text-white/70 leading-snug mb-3">
            {t("panel.usageMsg", { used: "2.340", total: "10.000" })}
          </p>
          <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden mb-3">
            <div className="h-full w-[23%] bg-green-primary rounded-full" />
          </div>
          <Link
            href="/painel/configuracoes"
            className="block text-center text-[11px] font-semibold text-black bg-green-primary hover:bg-green-primary/90 rounded-lg py-1.5"
          >
            {t("panel.upgrade")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
