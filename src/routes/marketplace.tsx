import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging, Boxes, Cpu, Filter, MapPin, Search, SlidersHorizontal, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell, DemoBadge, StatusPill } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { assets } from "@/lib/demo-data";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [
    { title: "Marketplace de Ativos — CircularIA" },
    { name: "description", content: "Encontre baterias, componentes eletrônicos e ativos da eletrificação para novos ciclos de valor." },
    { property: "og:title", content: "Marketplace de Ativos — CircularIA" },
    { property: "og:description", content: "Ativos disponíveis para reutilização, reparo, remanufatura, segunda vida e reciclagem." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Marketplace,
});

const allTypes = ["Todos", "Pack de bateria", "Módulo de bateria", "Célula", "BMS", "Inversor", "Conversor DC/DC", "Carregador embarcado", "Unidade de controle eletrônico", "Componentes de eletrônica de potência", "Motor elétrico", "Componentes do sistema de recarga", "Cabos e conectores de alta tensão", "Sensores e módulos eletrônicos", "Outro"];

function Marketplace() {
  const [interest, setInterest] = useState<string[]>([]);
  const [assetType, setAssetType] = useState("Todos");
  const [query, setQuery] = useState("");
  const isBattery = ["Pack de bateria", "Módulo de bateria", "Célula"].includes(assetType);
  const isInverter = assetType === "Inversor";
  const shown = useMemo(() => assets.filter((item) => (assetType === "Todos" || item.type === assetType) && `${item.name} ${item.type} ${item.manufacturer} ${item.city}`.toLowerCase().includes(query.toLowerCase())), [assetType, query]);
  return <AppShell title="Marketplace B2B" subtitle="Explore baterias, componentes e outros ativos da eletrificação com identidade e localização protegidas.">
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]"><aside className="rounded-lg border border-border bg-card p-4"><h2 className="flex items-center gap-2 font-bold"><SlidersHorizontal className="size-4"/>Filtros</h2><div className="mt-5 space-y-4"><FilterSelect label="Tipo de ativo" value={assetType} set={setAssetType} options={allTypes} />{(assetType === "Todos" || isBattery) && <><FilterSelect label="Química" options={["Todas", "LFP", "NMC", "NCA"]} /><FilterSelect label="Capacidade" options={["Todas", "Até 10 kWh", "40–80 kWh", "Acima de 80 kWh"]} /><FilterSelect label="SoH" options={["Todos", "Acima de 80%", "65–80%", "Abaixo de 65%"]} /></>}{(assetType === "Todos" || isInverter) && <><FilterSelect label="Potência" options={["Todas", "Até 50 kW", "50–150 kW", "Acima de 150 kW"]} /><FilterSelect label="Tensão" options={["Todas", "48 V", "350–450 V", "Acima de 450 V"]} /><FilterSelect label="Condição funcional" options={["Todas", "Funcional", "Recondicionado", "Requer reparo", "Não testado"]} /></>}<FilterSelect label="Estado" options={["Todos", "SP", "MG", "PR", "RS"]} /><FilterSelect label="Quantidade" options={["Todas", "1–5", "6–20", "Mais de 20"]} /><FilterSelect label="Destinação" options={["Todas", "Reutilização", "Segunda vida", "Remanufatura", "Recondicionamento", "Reparo", "Aproveitamento de componentes", "Reciclagem"]} /></div><Button variant="outline" className="mt-5 w-full"><Filter/>{shown.length} ativos</Button></aside>
      <div><div className="mb-5 flex gap-3"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Buscar ativo, modelo, fabricante ou cidade"/></div><DemoBadge/></div><div className="grid gap-4 xl:grid-cols-2">{shown.map((item) => { const Icon = item.category === "Bateria" ? BatteryCharging : item.category === "Componente eletrônico" ? Cpu : item.category === "Sistema de propulsão" ? Zap : Boxes; return <article key={item.id} className="rounded-lg border border-border bg-card p-5"><div className="flex justify-between"><span className="rounded-md bg-accent p-2 text-primary"><Icon/></span><DemoBadge/></div><div className="mt-5 flex flex-wrap items-center gap-2"><h2 className="text-xl font-bold">{item.name}</h2><StatusPill>{item.type}</StatusPill></div><p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4"/>{item.city} · localização aproximada</p><p className="mt-2 text-xs font-semibold text-primary">Empresa ofertante verificada · identidade protegida</p><dl className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">{item.chemistry && <Spec label="Química" value={item.chemistry} />}{item.soh != null && <Spec label="SoH informado" value={`${item.soh}%`} />}{item.capacity && <Spec label="Capacidade" value={item.capacity} />} {!item.chemistry && <><Spec label="Tensão" value={item.voltage} /><Spec label="Potência" value={item.power ?? "Não aplicável"} /><Spec label="Condição" value={item.condition} /><Spec label="Teste funcional" value={item.tested ? "Testado" : "Não testado"} /></>}<Spec label="Disponibilidade" value={`${item.qty} unidades`} /><Spec label="Destinação potencial" value={item.goal} wide /></dl><div className="mt-5 flex flex-wrap gap-2"><Button size="sm" variant="outline" asChild><Link to="/oportunidade" search={{ match: "#1842" }}>Ver detalhes</Link></Button><Button size="sm" variant="outline" onClick={() => setInterest((current) => current.includes(item.id) ? current : [...current, item.id])}>{interest.includes(item.id) ? "Interesse registrado" : "Demonstrar interesse"}</Button><Button size="sm" asChild><Link to="/matches">Solicitar Match<Sparkles/></Link></Button></div></article>; })}</div>{shown.length === 0 && <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">Nenhum ativo corresponde aos filtros selecionados.</div>}</div>
    </div>
  </AppShell>;
}

function FilterSelect({ label, options, value, set }: { label: string; options: string[]; value?: string; set?: (value: string) => void }) { return <label><span className="mb-1.5 block text-xs font-semibold">{label}</span><select value={value} onChange={(event) => set?.(event.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function Spec({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) { return <div className={wide ? "col-span-2" : ""}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="font-bold">{value}</dd></div>; }