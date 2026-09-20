import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging, MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { AppShell, DemoBadge, StatusPill } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCircular } from "@/lib/circular-store";
import { assets } from "@/lib/demo-data";

export const Route = createFileRoute("/empresa/conversas")({
  head: () => ({ meta: [
    { title: "Minhas Conversas — CircularIA" },
    { name: "description", content: "Negociações B2B protegidas e vinculadas aos ativos." },
    { property: "og:title", content: "Minhas Conversas — CircularIA" },
    { property: "og:description", content: "Acompanhe conversas, propostas e acordos demonstrativos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Conversations,
});

const filters = ["Todas", "Conversas ativas", "Propostas enviadas", "Propostas recebidas", "Em negociação", "Acordos concluídos"];

function Conversations() {
  const { conversations } = useCircular();
  const [filter, setFilter] = useState("Todas");
  const [query, setQuery] = useState("");
  const shown = conversations.filter((c) => {
    const asset = assets.find((a) => a.id === c.assetId);
    const match = `${c.assetId} ${asset?.name ?? ""} ${c.code} ${c.purpose}`.toLowerCase().includes(query.toLowerCase());
    if (!match) return false;
    if (filter === "Conversas ativas") return !["Operação concluída", "Identidades liberadas"].includes(c.status);
    if (filter === "Propostas enviadas") return c.status === "Proposta enviada";
    if (filter === "Propostas recebidas") return c.status === "Contraproposta recebida";
    if (filter === "Em negociação") return c.status === "Em negociação";
    if (filter === "Acordos concluídos") return ["Acordo fechado", "Pagamento da taxa pendente", "Identidades liberadas", "Operação concluída"].includes(c.status);
    return true;
  });
  return <AppShell title="Minhas Conversas" subtitle="Todas as negociações da empresa, protegidas e vinculadas a um ativo e a um match.">
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">{filters.map((f) => <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>{f}</Button>)}</div>
      <div className="relative min-w-64"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" placeholder="Por bateria ou destino" /></div>
    </div>
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[940px] text-left text-sm"><thead className="bg-muted text-xs text-muted-foreground"><tr>{["Bateria", "Empresa", "Oportunidade", "Status", "Última proposta", "Última mensagem", "Data/hora", ""].map((h) => <th key={h} className="p-4 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{shown.map((c) => { const asset = assets.find((a) => a.id === c.assetId); const last = c.messages.at(-1); return <tr key={c.id} className="border-t border-border align-top">
          <td className="p-4"><p className="flex items-center gap-2 font-bold"><BatteryCharging className="size-4 text-primary" />{asset?.name}</p><p className="mt-1 text-xs text-muted-foreground">{c.assetId}</p></td>
          <td className="p-4 font-semibold">Empresa Verificada {c.code}</td><td className="p-4">{c.purpose}</td><td className="p-4"><StatusPill>{c.status}</StatusPill></td>
          <td className="p-4 font-semibold">{c.lastValue}</td><td className="max-w-72 p-4 text-muted-foreground"><p className="line-clamp-2">{last?.text}</p></td><td className="p-4 text-xs text-muted-foreground">{last?.at}</td>
          <td className="p-4"><Button size="sm" asChild><Link to="/conversas/$id" params={{ id: c.id }}><MessageSquare />Abrir</Link></Button></td>
        </tr>; })}</tbody>
      </table>
    </div>
    <div className="mt-4"><DemoBadge /></div>
  </AppShell>;
}