import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, BatteryCharging, BrainCircuit, Building2, ChevronRight, CircleGauge, Factory, Home, LayoutDashboard, Map, Menu, PackagePlus, Recycle, Search, Sparkles, Store, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const demoLabel = "Dados demonstrativos";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" className={cn("flex items-center gap-2 font-display text-lg font-bold", inverse ? "text-primary-foreground" : "text-foreground")}><span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Recycle className="size-4" /></span>Circular<span className="text-primary">IA</span></Link>;
}

export function DemoBadge() { return <span className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-accent px-2 py-1 text-[10px] font-bold uppercase text-accent-foreground"><Sparkles className="size-3" />{demoLabel}</span>; }

const nav = [
  ["/dashboard", "Visão Geral", LayoutDashboard], ["/marketplace", "Marketplace", Store], ["/cadastrar", "Cadastrar Ativo", PackagePlus], ["/matches", "Matches da IA", BrainCircuit], ["/mapa", "Mapa da Circularidade", Map], ["/inteligencia", "Inteligência de Mercado", Activity], ["/baterias", "Minhas Baterias", BatteryCharging], ["/empresa", "Minha Empresa", Building2], ["/jornada", "Jornada da Bateria", Recycle],
] as const;

export function AppShell({ title, subtitle, children, actions }: { title: string; subtitle: string; children: ReactNode; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return <div className="min-h-screen bg-background">
    <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar px-4 py-5 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></Button></div>
      <div className="mt-8 rounded-md border border-primary/20 bg-accent/70 p-3 text-xs"><p className="font-bold text-accent-foreground">PROTÓTIPO · JUMP START 2026</p><p className="mt-1 text-muted-foreground">Ambiente conceitual</p></div>
      <nav className="mt-6 space-y-1">{nav.map(([to, label, Icon]) => <Link key={to} to={to} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", path === to ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent")}><Icon className="size-4" />{label}</Link>)}</nav>
      <div className="absolute inset-x-4 bottom-5 border-t border-sidebar-border pt-4 text-xs text-muted-foreground"><p className="font-semibold text-foreground">EcoStorage Energia</p><p>Consumidor de segunda vida</p></div>
    </aside>
    {open && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setOpen(false)} />}
    <main className="lg:pl-64">
      <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur md:px-8"><div className="flex items-center gap-3"><Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></Button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span>Plataforma</span><ChevronRight className="size-3"/><span className="text-foreground">{title}</span></div></div><div className="flex items-center gap-2"><DemoBadge />{actions}</div></header>
      <div className="mx-auto max-w-[1500px] p-5 md:p-8"><div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-2xl font-bold md:text-3xl">{title}</h1><p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p></div></div>{children}</div>
    </main>
  </div>;
}

export function StatCard({ label, value, detail, icon: Icon = CircleGauge }: { label: string; value: string; detail: string; icon?: typeof CircleGauge }) { return <div className="rounded-lg border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{label}</p><span className="rounded-md bg-accent p-2 text-primary"><Icon className="size-4"/></span></div><p className="mt-4 font-display text-3xl font-bold">{value}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p></div>; }

export function Pillars() { return <div className="grid gap-3 md:grid-cols-3">{[["Conectar","Oferta e demanda em um ecossistema confiável.",Search],["Otimizar","IA explicável como apoio à decisão.",BrainCircuit],["Aprender","Dados da cadeia viram inteligência.",Activity]].map(([t,d,I],i)=>{const Icon=I as typeof Search; return <div key={t as string} className="flex gap-4 border-l-2 border-primary bg-card p-4"><span className="font-display text-xl font-bold text-primary">0{i+1}</span><div><p className="font-bold">{t as string}</p><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div><Icon className="ml-auto size-5 text-primary"/></div>})}</div>; }

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) { return <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-lg font-bold">{children}</h2>{aside}</div>; }
export function Disclaimer() { return <div className="rounded-md border border-border bg-muted p-3 text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Apoio à decisão.</strong> Resultados não garantem condição, segurança ou destinação técnica. O SoH é informado ou proveniente de diagnóstico externo; a CircularIA não realiza diagnóstico físico.</div>; }
export function Bar({ label, value, max=100 }: { label:string; value:number; max?:number }) { return <div><div className="mb-1.5 flex justify-between text-xs"><span>{label}</span><strong>{value}{max===100?"%":""}</strong></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${Math.min(100,(value/max)*100)}%`}} /></div></div>; }
export function EmptyAction({ children }: { children: ReactNode }) { return <Button variant="outline" className="gap-2">{children}<ChevronRight className="size-4"/></Button>; }
export const icons = { Factory, Recycle };
