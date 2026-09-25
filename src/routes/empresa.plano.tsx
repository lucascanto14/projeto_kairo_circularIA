import { createFileRoute } from "@tanstack/react-router";
import { Activity, Check, Lock, Store, Zap } from "lucide-react";
import { AppShell, DemoBadge, StatusPill } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { useCircular } from "@/lib/circular-store";

export const Route = createFileRoute("/empresa/plano")({
  head: () => ({ meta: [
    { title: "Plano e Serviços — CircularIA" }, { name: "description", content: "Serviços independentes da CircularIA." },
    { property: "og:title", content: "Plano e Serviços — CircularIA" }, { property: "og:description", content: "Marketplace gratuito e CircularIA Intelligence por assinatura." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Plans,
});

function Plans() {
  const { plans, togglePlan } = useCircular();
  const products = [
    { id: "marketplace", name: "Marketplace", icon: Store, active: true, price: "Gratuito", text: "Cadastre ativos, receba matches, converse e negocie. Taxa apenas no sucesso da operação.", bullets: ["Conta e anúncios", "Matching inteligente", "Conversas e propostas", "Taxa demonstrativa — valor a definir"] },
    { id: "intelligence", name: "CircularIA Intelligence", icon: Activity, active: plans.intelligence, price: "Assinatura mensal · valor a definir", text: "Inteligência agregada e anonimizada sobre a cadeia brasileira de baterias.", bullets: ["Oferta e demanda", "Regiões e químicas", "Tendências e histórico", "Heatmaps e indicadores"] },
  ] as const;
  return <AppShell title="Plano e Serviços" subtitle="Use gratuitamente o Marketplace ou adicione o CircularIA Intelligence para acessar dados agregados e análises.">
    <div className="grid gap-5 lg:grid-cols-2">{products.map((p) => { const Icon = p.icon; return <article key={p.id} className={`rounded-lg border bg-card p-6 ${p.active ? "border-primary" : "border-border"}`}>
      <div className="flex items-start justify-between"><span className="rounded-md bg-accent p-3 text-primary"><Icon /></span><StatusPill tone={p.active ? "success" : "default"}>{p.active ? "Ativo" : "Não contratado"}</StatusPill></div>
      <h2 className="mt-5 text-xl font-bold">{p.name}</h2><p className="mt-1 text-sm font-semibold text-primary">{p.price}</p><p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
      <div className="mt-5 space-y-2">{p.bullets.map((b) => <p key={b} className="flex gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" />{b}</p>)}</div>
      {p.id !== "marketplace" && <Button className="mt-6 w-full" variant={p.active ? "outline" : "default"} onClick={() => togglePlan(p.id)}>{p.active ? <><Lock />Desativar demonstração</> : <><Zap />Simular contratação</>}</Button>}
    </article>; })}</div>
    <div className="mt-6 rounded-lg border border-border bg-card p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-bold">Combinação atual</h2><p className="mt-1 text-sm text-muted-foreground">Marketplace{plans.intelligence ? " + CircularIA Intelligence" : ""}</p></div><DemoBadge /></div></div>
  </AppShell>;
}