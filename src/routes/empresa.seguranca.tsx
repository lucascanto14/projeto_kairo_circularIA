import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { AppShell, DemoBadge } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/empresa/seguranca")({
  head: () => ({ meta: [
    { title: "Segurança — CircularIA" }, { name: "description", content: "Senha de transação e registros de segurança." },
    { property: "og:title", content: "Segurança — CircularIA" }, { property: "og:description", content: "Proteção demonstrativa de operações B2B." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Security,
});

function Security() { return <AppShell title="Segurança" subtitle="Gerencie a senha pessoal de transação, diferente da senha normal de acesso.">
  <div className="grid gap-5 lg:grid-cols-2">
    <div className="rounded-lg border border-border bg-card p-6"><span className="grid size-11 place-items-center rounded-md bg-accent text-primary"><LockKeyhole /></span><h2 className="mt-5 text-lg font-bold">Senha de transação</h2><p className="mt-2 text-sm text-muted-foreground">Exigida para aceitar a proposta final, confirmar acordo, autorizar pagamento, liberar identidade e confirmar destinação.</p><label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Nova senha de transação</span><Input type="password" placeholder="••••" maxLength={8} /></label><Button className="mt-4"><KeyRound />Atualizar senha</Button><p className="mt-3 text-xs text-muted-foreground">Na demonstração, use 1234. Em versão futura, esta camada poderá evoluir para MFA/2FA.</p></div>
    <div className="rounded-lg border border-border bg-card p-6"><h2 className="flex items-center gap-2 text-lg font-bold"><ShieldCheck className="text-primary" />Registro de segurança</h2><div className="mt-5 space-y-3">{[["Responsável demonstrativo", "Senha de transação configurada", "20/09/2026 · 10:15"], ["Administrador", "Documentação empresarial verificada", "18/09/2026 · 14:02"], ["Responsável demonstrativo", "Política de dados aceita", "17/09/2026 · 09:33"]].map((x) => <div key={x[1]} className="rounded-md bg-muted p-3"><p className="text-sm font-semibold">{x[1]}</p><p className="mt-1 text-xs text-muted-foreground">{x[0]} · {x[2]} · Concluído</p></div>)}</div><div className="mt-4"><DemoBadge /></div></div>
  </div>
  </AppShell>; }