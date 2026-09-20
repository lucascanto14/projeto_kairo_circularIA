import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, BatteryCharging, BrainCircuit, Building2, CheckCircle2, ChevronRight, CircleGauge, Factory, LayoutDashboard, Lock, Map, Menu, MessageSquare, PackagePlus, Recycle, Search, ShieldCheck, Sparkles, Store, Users, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCircular } from "@/lib/circular-store";
import { profiles } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const demoLabel = "Dados demonstrativos";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" className={cn("flex items-center gap-2 font-display text-lg font-bold", inverse ? "text-primary-foreground" : "text-foreground")}><span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Recycle className="size-4" /></span>Circular<span className="text-primary">IA</span></Link>;
}

export function DemoBadge() { return <span className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-accent px-2 py-1 text-[10px] font-bold uppercase text-accent-foreground"><Sparkles className="size-3" />{demoLabel}</span>; }

export function VerifiedBadge({ status = "Empresa verificada" }: { status?: string }) {
  const ok = status === "Empresa verificada";
  return <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold", ok ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>{ok ? <ShieldCheck className="size-3" /> : <Lock className="size-3" />}{status}</span>;
}

export function StatusPill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warn" }) {
  return <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold", tone === "success" ? "bg-primary text-primary-foreground" : tone === "warn" ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground")}>{children}</span>;
}

const nav = [
  { to: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
  { to: "/marketplace", label: "Marketplace", icon: Store },
  { to: "/cadastrar", label: "Cadastrar Ativo", icon: PackagePlus },
  { to: "/matches", label: "Matches Inteligentes", icon: BrainCircuit },
  { to: "/mapa", label: "Mapa da Circularidade", icon: Map },
  { to: "/inteligencia", label: "Inteligência de Mercado", icon: Activity, plan: "intelligence" as const },
  { to: "/baterias", label: "Minhas Baterias", icon: BatteryCharging },
  { to: "/empresa", label: "Minha Empresa", icon: Building2 },
  { to: "/jornada", label: "Jornada da Bateria", icon: Recycle, plan: "journey" as const },
];

export const companyTabs = [
  { to: "/empresa", label: "Perfil da Empresa" },
  { to: "/empresa/conversas", label: "Minhas Conversas" },
  { to: "/empresa/plano", label: "Plano e Serviços" },
  { to: "/empresa/documentacao", label: "Documentação e Verificação" },
  { to: "/empresa/seguranca", label: "Segurança" },
] as const;

function ProfileSwitcher() {
  const { profileId, setProfileId, profile } = useCircular();
  return (
    <label className="hidden items-center gap-2 text-xs md:flex">
      <Users className="size-4 text-primary" />
      <select value={profileId} onChange={(e) => setProfileId(e.target.value as typeof profileId)} className="h-9 rounded-md border border-input bg-background px-2 text-xs font-semibold" aria-label="Perfil demonstrativo">
        {profiles.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>
      <span className="hidden text-muted-foreground lg:inline">{profile.company}</span>
    </label>
  );
}

export function AppShell({ title, subtitle, children, actions }: { title: string; subtitle: string; children: ReactNode; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { profile, plans } = useCircular();
  return <div className="min-h-screen bg-background">
    <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-sidebar-border bg-sidebar px-4 py-5 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></Button></div>
      <div className="mt-6 rounded-md border border-primary/20 bg-accent/70 p-3 text-xs"><p className="font-bold text-accent-foreground">PROTÓTIPO · JUMP START 2026</p><p className="mt-1 text-muted-foreground">Ambiente conceitual</p></div>
      <nav className="mt-5 space-y-1 pb-28">
        {nav.map(({ to, label, icon: Icon, plan }) => {
          const locked = plan ? !plans[plan] : false;
          const active = to === "/empresa" ? path.startsWith("/empresa") : path === to;
          return <div key={to}>
            <Link to={to} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent")}>
              <Icon className="size-4" /><span className="flex-1">{label}</span>{locked && <Lock className="size-3 opacity-70" />}
            </Link>
            {to === "/empresa" && path.startsWith("/empresa") && <div className="ml-6 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
              {companyTabs.map((t) => <Link key={t.to} to={t.to} onClick={() => setOpen(false)} className={cn("block rounded-md px-2 py-1.5 text-xs font-medium", path === t.to ? "text-primary" : "text-muted-foreground hover:text-foreground")}>{t.label}</Link>)}
            </div>}
          </div>;
        })}
      </nav>
      <div className="sticky bottom-0 -mx-4 mt-2 border-t border-sidebar-border bg-sidebar px-4 pb-1 pt-3 text-xs">
        <p className="font-semibold text-foreground">{profile.company}</p>
        <p className="text-muted-foreground">{profile.role}</p>
        <div className="mt-2"><VerifiedBadge status={profile.verification} /></div>
      </div>
    </aside>
    {open && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setOpen(false)} />}
    <main className="lg:pl-64">
      <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-2 border-b border-border bg-background/95 px-5 py-2 backdrop-blur md:px-8">
        <div className="flex items-center gap-3"><Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></Button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span>Plataforma</span><ChevronRight className="size-3" /><span className="text-foreground">{title}</span></div></div>
        <div className="flex items-center gap-2"><ProfileSwitcher /><DemoBadge />{actions}</div>
      </header>
      <div className="mx-auto max-w-[1500px] p-5 md:p-8"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-2xl font-bold md:text-3xl">{title}</h1><p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p></div></div>{children}</div>
    </main>
  </div>;
}

export function LockedFeature({ product, description, children }: { product: "CircularIA Intelligence" | "CircularIA Journey"; description: string; children?: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-primary/40 bg-accent/40 p-8 text-center">
    <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary"><Lock className="size-5" /></span>
    <h2 className="mt-4 text-xl font-bold">🔒 {product}</h2>
    <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3">
      <Button asChild><Link to="/empresa/plano">Ver planos e serviços</Link></Button>
      {children}
    </div>
    <p className="mt-4 text-xs text-muted-foreground">Assinatura mensal — valor a definir. Dados demonstrativos.</p>
  </div>;
}

export function VerificationGate({ children }: { children: ReactNode }) {
  const { verification } = useCircular();
  if (verification === "Empresa verificada") return <>{children}</>;
  return <div className="rounded-lg border border-secondary bg-secondary/40 p-5 text-sm">
    <p className="font-bold">Ação disponível apenas para empresas verificadas</p>
    <p className="mt-1 text-muted-foreground">Status atual: {verification}. Anunciar ativos, negociar, enviar e responder propostas e concluir operações exigem verificação concluída.</p>
    <Button variant="outline" size="sm" className="mt-3" asChild><Link to="/empresa/documentacao">Concluir verificação</Link></Button>
  </div>;
}

export function AnonCompanyCard({ code, type, region, chemistries, rating, operations, extra }: { code: string; type: string; region: string; chemistries: string[]; rating: number; operations: number; extra?: ReactNode }) {
  return <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center justify-between"><p className="font-bold">Empresa Verificada {code}</p><VerifiedBadge /></div>
    <p className="mt-1 text-sm text-muted-foreground">{type} · Região: {region}</p>
    <p className="mt-1 text-sm text-muted-foreground">Especialização: {chemistries.join(" / ")}</p>
    <p className="mt-1 text-sm"><strong>Avaliação: {rating.toFixed(1)}</strong> · {operations} operações concluídas</p>
    {extra}
  </div>;
}

export function StatCard({ label, value, detail, icon: Icon = CircleGauge }: { label: string; value: string; detail: string; icon?: typeof CircleGauge }) { return <div className="rounded-lg border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{label}</p><span className="rounded-md bg-accent p-2 text-primary"><Icon className="size-4" /></span></div><p className="mt-4 font-display text-3xl font-bold">{value}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p></div>; }

export function Pillars() { return <div className="grid gap-3 md:grid-cols-3">{[["Conectar", "Oferta e demanda em um ecossistema confiável.", Search], ["Otimizar", "Matching explicável como apoio à decisão.", BrainCircuit], ["Aprender", "Dados da cadeia viram inteligência de mercado.", Activity]].map(([t, d, I], i) => { const Icon = I as typeof Search; return <div key={t as string} className="flex gap-4 border-l-2 border-primary bg-card p-4"><span className="font-display text-xl font-bold text-primary">0{i + 1}</span><div><p className="font-bold">{t as string}</p><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div><Icon className="ml-auto size-5 text-primary" /></div>; })}</div>; }

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) { return <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">{children}</h2>{aside}</div>; }
export function Disclaimer() { return <div className="rounded-md border border-border bg-muted p-3 text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Apoio à decisão.</strong> Resultados não garantem condição, segurança ou destinação técnica. O SoH é informado ou proveniente de diagnóstico externo; a CircularIA não realiza diagnóstico físico. Inspeção, ensaio ou certificação permanecem com agentes tecnicamente habilitados.</div>; }
export function Bar({ label, value, max = 100 }: { label: string; value: number; max?: number }) { return <div><div className="mb-1.5 flex justify-between text-xs"><span>{label}</span><strong>{value}{max === 100 ? "%" : ""}</strong></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div></div>; }
export function EmptyAction({ children }: { children: ReactNode }) { return <Button variant="outline" className="gap-2">{children}<ChevronRight className="size-4" /></Button>; }
export function CheckLine({ children }: { children: ReactNode }) { return <span className="flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 shrink-0 text-primary" />{children}</span>; }
export const icons = { Factory, Recycle, MessageSquare };
