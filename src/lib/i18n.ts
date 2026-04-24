export const locales = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, { label: string; flag: string; short: string }> = {
  "pt-BR": { label: "Português (BR)", flag: "🇧🇷", short: "PT" },
  en: { label: "English", flag: "🇺🇸", short: "EN" },
  es: { label: "Español", flag: "🇪🇸", short: "ES" },
};

type Dict = Record<string, string>;

const pt: Dict = {
  // Nav
  "nav.features": "Funcionalidades",
  "nav.howItWorks": "Como funciona",
  "nav.pricing": "Planos",
  "nav.faq": "FAQ",
  "nav.signIn": "Entrar",
  "nav.startFree": "Começar grátis",
  "nav.accessPanel": "Acessar painel",

  // Hero
  "hero.badge": "Centralize, organize e automatize o WhatsApp",
  "hero.title.line1": "WhatsApp Bot",
  "hero.title.line2": "para organizar seu",
  "hero.title.line3": "atendimento",
  "hero.description":
    "Centralize todas as conversas em uma caixa de entrada para a equipe, responda de qualquer lugar e dispare mensagens automáticas. Adicione a IA que responde sozinha quando precisar.",
  "hero.bullet.inbox": "Inbox único para toda a equipe por setor",
  "hero.bullet.anywhere": "Atenda do celular, do navegador ou em equipe",
  "hero.bullet.outbound": "Disparo de mensagens e lembretes automáticos",
  "hero.bullet.quickReplies": "Respostas rápidas e automações por palavra-chave",
  "hero.bullet.ai": "IA que conversa e resolve sozinha (add-on opcional)",
  "hero.cta.primary": "Começar agora",
  "hero.cta.secondary": "Como funciona",
  "hero.tag.inbox": "Inbox",
  "hero.tag.scheduling": "Disparos",
  "hero.tag.ai": "IA (add-on)",

  // Features heading
  "features.eyebrow": "Funcionalidades",
  "features.title.prefix": "Tudo que você precisa para",
  "features.title.highlight": "organizar",
  "features.subtitle":
    "Um hub para o atendimento via WhatsApp. Com o add-on de IA, o bot ainda responde sozinho.",

  // Pricing
  "pricing.eyebrow": "Planos",
  "pricing.title.prefix": "Escolha o plano",
  "pricing.title.highlight": "ideal para você",
  "pricing.subtitle":
    "Planos flexíveis que crescem com o seu negócio. A IA que responde sozinha é um add-on opcional.",
  "pricing.popular": "Mais popular",
  "pricing.aiAddon.badge": "Add-on opcional",
  "pricing.aiAddon.title": "IA que responde sozinha",
  "pricing.aiAddon.description":
    "Ligue a IA para que o bot entenda, responda e resolva conversas 24/7, encaminhando ao humano só quando preciso.",
  "pricing.aiAddon.price": "+ R$ 197",
  "pricing.aiAddon.period": "/mês",
  "pricing.aiAddon.cta": "Adicionar IA",

  // Footer
  "footer.description": "Organize o atendimento via WhatsApp com sua equipe — do jeito que você quer.",
  "footer.product": "Produto",
  "footer.company": "Empresa",
  "footer.resources": "Recursos",
  "footer.legal": "Legal",
  "footer.rights": "Todos os direitos reservados.",

  // Painel / Sidebar
  "panel.operation": "Operação",
  "panel.automation": "Automação",
  "panel.management": "Gestão",
  "panel.system": "Sistema",
  "panel.tickets": "Atendimentos",
  "panel.contacts": "Contatos",
  "panel.campaigns": "Campanhas",
  "panel.flows": "Fluxos",
  "panel.quickReplies": "Respostas rápidas",
  "panel.sectors": "Setores",
  "panel.users": "Usuários",
  "panel.reports": "Relatórios",
  "panel.connections": "Conexões WhatsApp",
  "panel.settings": "Configurações",
  "panel.help": "Central de Ajuda",
  "panel.customerPanel": "Painel do cliente",
  "panel.planPro": "Plano Pro",
  "panel.usageMsg": "{used} / {total} mensagens este mês",
  "panel.upgrade": "Fazer upgrade",
  "panel.search": "Buscar ou executar…",
  "panel.myProfile": "Meu perfil",
  "panel.logout": "Sair",
  "panel.language": "Idioma",
  "panel.theme": "Alternar tema",

  // Common
  "common.save": "Salvar",
  "common.cancel": "Cancelar",
  "common.delete": "Excluir",
  "common.create": "Criar",
  "common.edit": "Editar",
};

const en: Dict = {
  "nav.features": "Features",
  "nav.howItWorks": "How it works",
  "nav.pricing": "Pricing",
  "nav.faq": "FAQ",
  "nav.signIn": "Sign in",
  "nav.startFree": "Start free",
  "nav.accessPanel": "Go to panel",

  "hero.badge": "Centralize, organize and automate WhatsApp",
  "hero.title.line1": "WhatsApp Bot",
  "hero.title.line2": "to organize your",
  "hero.title.line3": "customer support",
  "hero.description":
    "Keep every conversation in one shared inbox, reply from anywhere and trigger automated messages. Add the AI add-on when you want the bot to reply on its own.",
  "hero.bullet.inbox": "Single inbox for your whole team, by sector",
  "hero.bullet.anywhere": "Reply from mobile, web or as a team",
  "hero.bullet.outbound": "Automated message blasts and reminders",
  "hero.bullet.quickReplies": "Quick replies and keyword-based automations",
  "hero.bullet.ai": "AI that replies and resolves on its own (optional add-on)",
  "hero.cta.primary": "Start now",
  "hero.cta.secondary": "How it works",
  "hero.tag.inbox": "Inbox",
  "hero.tag.scheduling": "Broadcasts",
  "hero.tag.ai": "AI (add-on)",

  "features.eyebrow": "Features",
  "features.title.prefix": "Everything you need to",
  "features.title.highlight": "organize",
  "features.subtitle":
    "One hub for your WhatsApp support. Enable the AI add-on and the bot replies on its own.",

  "pricing.eyebrow": "Plans",
  "pricing.title.prefix": "Pick the right plan",
  "pricing.title.highlight": "for you",
  "pricing.subtitle":
    "Flexible plans that grow with your business. Self-replying AI is an optional add-on.",
  "pricing.popular": "Most popular",
  "pricing.aiAddon.badge": "Optional add-on",
  "pricing.aiAddon.title": "AI that replies on its own",
  "pricing.aiAddon.description":
    "Turn the AI on so the bot understands, answers and resolves conversations 24/7, handing off to humans only when needed.",
  "pricing.aiAddon.price": "+ $39",
  "pricing.aiAddon.period": "/month",
  "pricing.aiAddon.cta": "Add AI",

  "footer.description": "Organize your WhatsApp support with your team — your way.",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.resources": "Resources",
  "footer.legal": "Legal",
  "footer.rights": "All rights reserved.",

  "panel.operation": "Operations",
  "panel.automation": "Automation",
  "panel.management": "Management",
  "panel.system": "System",
  "panel.tickets": "Tickets",
  "panel.contacts": "Contacts",
  "panel.campaigns": "Campaigns",
  "panel.flows": "Flows",
  "panel.quickReplies": "Quick replies",
  "panel.sectors": "Sectors",
  "panel.users": "Users",
  "panel.reports": "Reports",
  "panel.connections": "WhatsApp connections",
  "panel.settings": "Settings",
  "panel.help": "Help center",
  "panel.customerPanel": "Customer panel",
  "panel.planPro": "Pro plan",
  "panel.usageMsg": "{used} / {total} messages this month",
  "panel.upgrade": "Upgrade",
  "panel.search": "Search or run…",
  "panel.myProfile": "My profile",
  "panel.logout": "Sign out",
  "panel.language": "Language",
  "panel.theme": "Toggle theme",

  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.create": "Create",
  "common.edit": "Edit",
};

const es: Dict = {
  "nav.features": "Funcionalidades",
  "nav.howItWorks": "Cómo funciona",
  "nav.pricing": "Planes",
  "nav.faq": "FAQ",
  "nav.signIn": "Entrar",
  "nav.startFree": "Empezar gratis",
  "nav.accessPanel": "Ir al panel",

  "hero.badge": "Centraliza, organiza y automatiza WhatsApp",
  "hero.title.line1": "WhatsApp Bot",
  "hero.title.line2": "para organizar tu",
  "hero.title.line3": "atención al cliente",
  "hero.description":
    "Reúne cada conversación en una sola bandeja compartida, responde desde cualquier lugar y dispara mensajes automáticos. Suma el add-on de IA cuando quieras que el bot responda solo.",
  "hero.bullet.inbox": "Bandeja única para todo el equipo, por sector",
  "hero.bullet.anywhere": "Responde desde móvil, web o en equipo",
  "hero.bullet.outbound": "Envíos masivos y recordatorios automáticos",
  "hero.bullet.quickReplies": "Respuestas rápidas y automatizaciones por palabra clave",
  "hero.bullet.ai": "IA que responde y resuelve sola (add-on opcional)",
  "hero.cta.primary": "Empezar ahora",
  "hero.cta.secondary": "Cómo funciona",
  "hero.tag.inbox": "Bandeja",
  "hero.tag.scheduling": "Envíos",
  "hero.tag.ai": "IA (add-on)",

  "features.eyebrow": "Funcionalidades",
  "features.title.prefix": "Todo lo que necesitas para",
  "features.title.highlight": "organizar",
  "features.subtitle":
    "Un hub para tu atención en WhatsApp. Activa el add-on de IA y el bot responde solo.",

  "pricing.eyebrow": "Planes",
  "pricing.title.prefix": "Elige el plan",
  "pricing.title.highlight": "ideal para ti",
  "pricing.subtitle":
    "Planes flexibles que crecen contigo. La IA que responde sola es un add-on opcional.",
  "pricing.popular": "Más popular",
  "pricing.aiAddon.badge": "Add-on opcional",
  "pricing.aiAddon.title": "IA que responde sola",
  "pricing.aiAddon.description":
    "Activa la IA para que el bot entienda, responda y resuelva conversaciones 24/7, derivando a humanos solo cuando haga falta.",
  "pricing.aiAddon.price": "+ 39€",
  "pricing.aiAddon.period": "/mes",
  "pricing.aiAddon.cta": "Añadir IA",

  "footer.description": "Organiza tu atención de WhatsApp con tu equipo — a tu manera.",
  "footer.product": "Producto",
  "footer.company": "Empresa",
  "footer.resources": "Recursos",
  "footer.legal": "Legal",
  "footer.rights": "Todos los derechos reservados.",

  "panel.operation": "Operación",
  "panel.automation": "Automatización",
  "panel.management": "Gestión",
  "panel.system": "Sistema",
  "panel.tickets": "Atenciones",
  "panel.contacts": "Contactos",
  "panel.campaigns": "Campañas",
  "panel.flows": "Flujos",
  "panel.quickReplies": "Respuestas rápidas",
  "panel.sectors": "Sectores",
  "panel.users": "Usuarios",
  "panel.reports": "Informes",
  "panel.connections": "Conexiones de WhatsApp",
  "panel.settings": "Configuración",
  "panel.help": "Centro de ayuda",
  "panel.customerPanel": "Panel del cliente",
  "panel.planPro": "Plan Pro",
  "panel.usageMsg": "{used} / {total} mensajes este mes",
  "panel.upgrade": "Mejorar plan",
  "panel.search": "Buscar o ejecutar…",
  "panel.myProfile": "Mi perfil",
  "panel.logout": "Salir",
  "panel.language": "Idioma",
  "panel.theme": "Cambiar tema",

  "common.save": "Guardar",
  "common.cancel": "Cancelar",
  "common.delete": "Eliminar",
  "common.create": "Crear",
  "common.edit": "Editar",
};

export const dictionaries: Record<Locale, Dict> = { "pt-BR": pt, en, es };
