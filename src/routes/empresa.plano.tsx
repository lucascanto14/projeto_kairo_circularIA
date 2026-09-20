import { createFileRoute } from "@tanstack/react-router";
import { Activity, Check, Lock, Recycle, Store, Zap } from "lucide-react";
import { AppShell, DemoBadge, StatusPill } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { useCircular } from "@/lib/circular-store";

export const Route = createFileRoute("/empresa/plano")({
  head: () => ({ meta: [
    { title: "Plano e Serviços — CircularIA" }, { name: "description", content: "Serviços independentes da CircularIA." },
    { property: "og:title", content: "Plano e Serviços — CircularIA" }, { property: "og:description", content: "Marketplace, Intelligence e Journey." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Plans,
});

function Plans() {
  const { plans, togglePlan } = useCircular();
  const products = [
    { id: "marketplace", name: "Marketplace", icon: Store, active: true, price: "Gratuito", text: "Cadastre ativos, receba matches, converse e negocie. Taxa apenas no sucesso da operação.", bullets: ["Conta e anúncios", "Matching inteligente", "Conversas e propostas", "Taxa demonstrativa — valor a definir"] },
    { id: "intelligence", name: "CircularIA Intelligence", icon: Activity, active: plans.intelligence, price: "Assinatura mensal · valor a definir", text: "Inteligência agregada e anonimizada sobre a cadeia brasileira de baterias.", bullets: ["Oferta e demanda", "Regiões e químicas", "Tendências e histórico", "Heatmaps e indicadores"] },
    { id: "journey", name: "CircularIA Journey", icon: Recycle, active: plans.journey, price: "Mensal ou pacotes · preço a definir", text: "Rastreabilidade do ciclo de vida dos ativos contratados.", bullets: ["Plano até X baterias", "Pacotes de 10, 50 ou 100", "Documentos e eventos", "Pode ser contratado sem Intelligence"] },
  ] as const;
  return <AppShell title="Plano e Serviços" subtitle="Marketplace, Intelligence e Journey são independentes e podem ser combinados conforme a operação.">
    <div className="grid gap-5 xl:grid-cols-3">{products.map((p) => { const Icon = p.icon; return <article key={p.id} className={`rounded-lg border bg-card p-6 ${p.active ? "border-primary" : "border-border"}`}>
      <div className="flex items-start justify-between"><span className="rounded-md bg-accent p-3 text-primary"><Icon /></span><StatusPill tone={p.active ? "success" : "default"}>{p.active ? "Ativo" : "Não contratado"}</StatusPill></div>
      <h2 className="mt-5 text-xl font-bold">{p.name}</h2><p className="mt-1 text-sm font-semibold text-primary">{p.price}</p><p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
      <div className="mt-5 space-y-2">{p.bullets.map((b) => <p key={b} className="flex gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" />{b}</p>)}</div>
      {p.id !== "marketplace" && <Button className="mt-6 w-full" variant={p.active ? "outline" : "default"} onClick={() => togglePlan(p.id)}>{p.active ? <><Lock />Desativar demonstração</> : <><Zap />Simular contratação</>}</Button>}
    </article>; })}</div>
    <div className="mt-6 rounded-lg border border-border bg-card p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-bold">Combinação atual</h2><p className="mt-1 text-sm text-muted-foreground">Marketplace{plans.intelligence ? " + Intelligence" : ""}{plans.journey ? " + Journey" : ""}</p></div><DemoBadge /></div></div>
  </AppShell>;
}