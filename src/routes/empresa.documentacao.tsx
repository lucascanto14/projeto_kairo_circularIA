import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText, ShieldCheck, Upload } from "lucide-react";
import { useState } from "react";
import { AppShell, DemoBadge, StatusPill } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCircular } from "@/lib/circular-store";
import type { VerificationStatus } from "@/lib/demo-data";

export const Route = createFileRoute("/empresa/documentacao")({
  head: () => ({ meta: [
    { title: "Documentação e Verificação — CircularIA" }, { name: "description", content: "Verificação empresarial e habilitação técnica aplicável." },
    { property: "og:title", content: "Documentação e Verificação — CircularIA" }, { property: "og:description", content: "Fluxo demonstrativo de verificação profissional." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Verification,
});

function Verification() {
  const { verification, setVerification } = useCircular();
  const [terms, setTerms] = useState({ use: true, data: true });
  const statuses: VerificationStatus[] = ["Em análise", "Empresa verificada", "Documentação pendente", "Documentação rejeitada"];
  return <AppShell title="Verificação da Empresa e Responsável Técnico" subtitle="Etapa obrigatória para anunciar, negociar, enviar propostas e concluir operações.">
    <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Dados cadastrais</h2><p className="mt-1 text-xs text-muted-foreground">Documentos ficam privados e nunca são exibidos a outras empresas.</p></div><StatusPill tone={verification === "Empresa verificada" ? "success" : "warn"}>{verification}</StatusPill></div>
        <div className="grid gap-5 md:grid-cols-2">{["Razão social", "Nome fantasia", "CNPJ", "Segmento de atuação", "Responsável legal", "Responsável técnico, quando aplicável", "Registro CREA ou CRT, quando aplicável", "Número do registro profissional"].map((f, i) => <label key={f}><span className="mb-2 block text-sm font-semibold">{f}</span><Input defaultValue={i === 3 ? "Gestão de ativos de mobilidade elétrica" : "Dado demonstrativo"} /></label>)}</div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{["Documentação comprobatória", "Documentos da empresa"].map((x) => <div key={x} className="rounded-md border border-dashed border-input p-5 text-center"><Upload className="mx-auto size-5 text-primary" /><p className="mt-2 text-sm font-semibold">{x}</p><Button variant="outline" size="sm" className="mt-3">Selecionar arquivos</Button><p className="mt-2 text-xs text-muted-foreground">Arquivo demonstrativo · acesso privado</p></div>)}</div>
        <div className="mt-6 space-y-3">{[["use", "Aceito os termos de uso"], ["data", "Aceito a política de tratamento de dados"]].map(([key, text]) => <label key={key} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={terms[key as keyof typeof terms]} onChange={(e) => setTerms((s) => ({ ...s, [key]: e.target.checked }))} className="size-4 accent-primary" />{text}</label>)}</div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-primary/30 bg-accent p-5"><ShieldCheck className="size-7 text-primary" /><h2 className="mt-4 font-bold">Confiança e rastreabilidade</h2><p className="mt-2 text-sm text-muted-foreground">A CircularIA verifica documentação empresarial e habilitação técnica aplicável para aumentar a confiabilidade e a rastreabilidade dos participantes.</p><p className="mt-3 text-xs text-muted-foreground">CREA ou CRT não garantem qualidade absoluta. Validações técnicas específicas permanecem sob responsabilidade de agentes habilitados.</p></div>
        <div className="rounded-lg border border-border bg-card p-5"><h2 className="flex items-center gap-2 font-bold"><FileText className="size-4 text-primary" />Simular status</h2><div className="mt-4 grid gap-2">{statuses.map((s) => <Button key={s} variant={verification === s ? "default" : "outline"} onClick={() => setVerification(s)}>{verification === s && <Check />}{s}</Button>)}</div><div className="mt-4"><DemoBadge /></div></div>
      </aside>
    </div>
  </AppShell>;
}