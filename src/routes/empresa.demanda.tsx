import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AppShell, DemoBadge } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { demandProfile } from "@/lib/demo-data";

export const Route = createFileRoute("/empresa/demanda")({
  head: () => ({ meta: [
    { title: "Perfil de Demanda — CircularIA" }, { name: "description", content: "Configure o perfil de baterias e componentes procurados." },
    { property: "og:title", content: "Perfil de Demanda — CircularIA" }, { property: "og:description", content: "Demanda demonstrativa para matching inteligente." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Demand,
});

function Demand() {
  const fields = [["Tipos de ativo aceitos", demandProfile.type], ["Categoria", demandProfile.category], ["Química, para baterias", demandProfile.chemistry], ["Capacidade, para baterias", demandProfile.capacity], ["Tensão", demandProfile.voltage], ["Potência, quando aplicável", demandProfile.power], ["Compatibilidade conhecida", demandProfile.compatibility], ["Quantidade", demandProfile.qty], ["Condição desejada", demandProfile.condition], ["SoH mínimo, somente para baterias", demandProfile.minSoh], ["Região de interesse", demandProfile.region], ["Finalidade", demandProfile.purpose], ["Capacidade de absorção", demandProfile.absorption], ["Frequência de compra", demandProfile.frequency]];
  return <AppShell title="Perfil de Demanda" subtitle="Cadastre o que sua empresa procura para receber matches mais relevantes."><div className="rounded-lg border border-border bg-card p-6"><div className="grid gap-5 md:grid-cols-2">{fields.map(([label, value]) => <label key={label}><span className="mb-2 block text-sm font-semibold">{label}</span><Input defaultValue={value} /></label>)}</div><label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Observações</span><Textarea defaultValue={demandProfile.notes} /></label><div className="mt-6 flex items-center justify-between"><DemoBadge /><Button><Save />Salvar perfil demonstrativo</Button></div></div></AppShell>;
}