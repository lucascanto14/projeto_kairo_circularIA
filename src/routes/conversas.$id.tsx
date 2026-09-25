import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, CheckCircle2, LockKeyhole, MessageSquare, Send, ShieldAlert, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell, DemoBadge, Disclaimer, StatusPill, VerificationGate } from "@/components/circular-ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCircular } from "@/lib/circular-store";
import { assets, counterparts } from "@/lib/demo-data";
import { moderationExamples } from "@/lib/moderation";

export const Route = createFileRoute("/conversas/$id")({
  head: () => ({ meta: [
    { title: "Negociação protegida — CircularIA" }, { name: "description", content: "Conversa, proposta e conclusão protegidas pela CircularIA." },
    { property: "og:title", content: "Negociação protegida — CircularIA" }, { property: "og:description", content: "Fluxo demonstrativo de transação B2B." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ConversationPage,
});

function ConversationPage() {
  const { id } = Route.useParams();
  const { getConversation, sendMessage, sendProposal, receiveCounter, setStatus, confirmAgreement, payFee, completeOperation, plans } = useCircular();
  const conversation = getConversation(id);
  const [text, setText] = useState("");
  const [proposalOpen, setProposalOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [proposal, setProposal] = useState({ qty: 8, unit: "R$ X", total: "R$ X", term: "30 dias", conditions: "Coleta a combinar", notes: "Proposta demonstrativa; valores a definir." });
  const asset = assets.find((a) => a.id === conversation?.assetId);
  const company = counterparts.find((c) => c.code === conversation?.code);
  const steps = ["Conversa iniciada", "Proposta enviada", "Contraproposta recebida", "Acordo fechado", "Pagamento da taxa pendente", "Identidades liberadas", "Operação concluída"];
  const progress = useMemo(() => {
    if (!conversation) return 0;
    if (conversation.status === "Em negociação") return 2;
    if (conversation.status === "Acordo em análise") return 3;
    return Math.max(0, steps.indexOf(conversation.status));
  }, [conversation]);

  if (!conversation || !asset || !company) return <AppShell title="Conversa indisponível" subtitle="A negociação solicitada não foi encontrada."><Button asChild><Link to="/empresa/conversas">Voltar às conversas</Link></Button></AppShell>;

  const submitMessage = () => { if (!text.trim()) return; sendMessage(id, text.trim()); setText(""); };
  const finalStatus = ["Identidades liberadas", "Operação concluída"].includes(conversation.status);

  return <AppShell title="Negociação protegida" subtitle="Conversa vinculada à bateria, ao match e às duas empresas participantes.">
    <Button variant="ghost" className="mb-5" asChild><Link to="/empresa/conversas"><ArrowLeft />Todas as conversas</Link></Button>
    <div className="mb-5 overflow-x-auto rounded-lg border border-border bg-card p-4"><div className="flex min-w-[760px] items-center">{steps.map((s, i) => <div key={s} className="flex flex-1 items-center"><div className="flex min-w-0 flex-col items-center text-center"><span className={`grid size-7 place-items-center rounded-full text-xs font-bold ${i <= progress ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i < progress ? <CheckCircle2 className="size-4" /> : i + 1}</span><span className="mt-2 max-w-24 text-[10px] text-muted-foreground">{s}</span></div>{i < steps.length - 1 && <span className={`mb-5 h-0.5 flex-1 ${i < progress ? "bg-primary" : "bg-border"}`} />}</div>)}</div></div>
    <div className="grid gap-5 xl:grid-cols-[1fr_350px]">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="border-b border-border bg-muted/60 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-lg font-bold">{asset.name}</p><p className="mt-1 text-sm text-muted-foreground">Empresa Verificada {conversation.code} · Match: {conversation.score}%</p></div><div className="flex gap-2"><StatusPill>{conversation.status}</StatusPill><DemoBadge /></div></div></header>
        <div className="max-h-[520px] min-h-[390px] space-y-4 overflow-y-auto p-5">{conversation.messages.map((m) => <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[82%] rounded-lg p-3 text-sm ${m.from === "system" ? "border border-secondary bg-secondary/40" : m.from === "me" ? m.blocked ? "border border-destructive/40 bg-destructive/10" : "bg-primary text-primary-foreground" : "bg-muted"}`}>
            {m.blocked && <p className="mb-2 flex items-center gap-2 font-bold"><ShieldAlert className="size-4" />Tentativa bloqueada</p>}<p>{m.text}</p><p className={`mt-2 text-[10px] ${m.from === "me" && !m.blocked ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.from === "me" ? "Você" : m.from === "them" ? `Empresa Verificada ${conversation.code}` : "CircularIA"} · {m.at}</p>
          </div></div>)}</div>
        <div className="border-t border-border p-4"><div className="mb-3 flex flex-wrap gap-2"><span className="text-xs font-semibold text-muted-foreground">Exemplos de bloqueio:</span>{moderationExamples.slice(0, 2).map((e) => <Button key={e} size="sm" variant="outline" onClick={() => setText(e)}>Testar contato externo</Button>)}</div><div className="flex gap-2"><Textarea value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitMessage(); } }} placeholder="Escreva uma mensagem sem dados de contato externo" className="min-h-11" /><Button size="icon" className="size-11 shrink-0" onClick={submitMessage} aria-label="Enviar mensagem"><Send /></Button></div></div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-5"><p className="text-xs font-bold uppercase text-primary">Identidade protegida</p>{finalStatus ? <><h2 className="mt-3 font-bold">{company.realName}</h2><p className="mt-1 text-sm text-muted-foreground">Identidade liberada após acordo, taxa e senha validados.</p></> : <><h2 className="mt-3 font-bold">Empresa Verificada {company.code}</h2><p className="mt-1 text-sm text-muted-foreground">{company.type} · Região: {company.region}</p><p className="mt-1 text-sm text-muted-foreground">Especialização: {company.chemistries.join(" / ")}</p><p className="mt-1 text-sm">Avaliação: {company.rating.toFixed(1)} · {company.operations} operações</p></>}<p className="mt-4 text-xs text-muted-foreground">Nome, CNPJ, contatos e endereço permanecem ocultos até a conclusão protegida.</p></div>
        <div className="rounded-lg border border-border bg-card p-5"><h2 className="font-bold">Última proposta</h2>{conversation.proposals.length ? <div className="mt-3 text-sm"><p><strong>{conversation.lastValue}</strong> · {conversation.proposals.at(-1)?.qty} unidades</p><p className="mt-1 text-muted-foreground">Prazo: {conversation.proposals.at(-1)?.term}</p><p className="mt-1 text-muted-foreground">{conversation.proposals.at(-1)?.conditions}</p></div> : <p className="mt-2 text-sm text-muted-foreground">Nenhuma proposta enviada.</p>}</div>
        <VerificationGate><div className="grid gap-2">
          {!finalStatus && <Button onClick={() => setProposalOpen(true)}><MessageSquare />Enviar proposta</Button>}
          {conversation.status === "Proposta enviada" && <Button variant="outline" onClick={() => receiveCounter(id)}><Sparkles />Simular contraproposta</Button>}
          {["Contraproposta recebida", "Em negociação", "Proposta enviada"].includes(conversation.status) && <Button variant="outline" onClick={() => setStatus(id, "Acordo fechado")}>Registrar acordo</Button>}
          {conversation.status === "Acordo fechado" && <Button onClick={() => setTransactionOpen(true)}><LockKeyhole />Confirmar com senha</Button>}
          {conversation.status === "Pagamento da taxa pendente" && <Button onClick={() => payFee(id)}>Simular pagamento da taxa</Button>}
          {conversation.status === "Identidades liberadas" && <Button onClick={() => completeOperation(id)}>Concluir operação</Button>}
          {conversation.status === "Operação concluída" && plans.intelligence && <Button variant="outline" asChild><Link to="/inteligencia">Ver impacto anonimizado</Link></Button>}
        </div></VerificationGate>
        <div className="rounded-lg border border-secondary bg-secondary/30 p-4 text-xs text-muted-foreground"><AlertTriangle className="mb-2 size-4 text-data-c" />Taxa CircularIA: X% do valor da operação. Taxa demonstrativa — valor a definir.</div>
        <Disclaimer />
        {conversation.log.length > 0 && <div className="rounded-lg border border-border bg-card p-5"><h2 className="font-bold">Registro da operação</h2><div className="mt-3 space-y-3">{conversation.log.map((l, i) => <div key={`${l.at}-${i}`} className="border-l-2 border-primary pl-3 text-xs"><p className="font-semibold">{l.action}</p><p className="mt-1 text-muted-foreground">{l.who} · {l.at} · {l.status}</p></div>)}</div></div>}
      </aside>
    </div>

    <Dialog open={proposalOpen} onOpenChange={setProposalOpen}><DialogContent><DialogHeader><DialogTitle>Enviar proposta</DialogTitle><DialogDescription>Proposta demonstrativa vinculada a {asset.id} e à Empresa Verificada {company.code}.</DialogDescription></DialogHeader><div className="grid gap-4 md:grid-cols-2"><Field label="Quantidade"><Input type="number" value={proposal.qty} onChange={(e) => setProposal((p) => ({ ...p, qty: Number(e.target.value) }))} /></Field><Field label="Preço unitário"><Input value={proposal.unit} onChange={(e) => setProposal((p) => ({ ...p, unit: e.target.value }))} /></Field><Field label="Valor total"><Input value={proposal.total} onChange={(e) => setProposal((p) => ({ ...p, total: e.target.value }))} /></Field><Field label="Prazo"><Input value={proposal.term} onChange={(e) => setProposal((p) => ({ ...p, term: e.target.value }))} /></Field><Field label="Condições" wide><Textarea value={proposal.conditions} onChange={(e) => setProposal((p) => ({ ...p, conditions: e.target.value }))} /></Field><Field label="Observações" wide><Textarea value={proposal.notes} onChange={(e) => setProposal((p) => ({ ...p, notes: e.target.value }))} /></Field></div><DialogFooter><Button variant="outline" onClick={() => setProposalOpen(false)}>Cancelar</Button><Button onClick={() => { sendProposal(id, proposal); setProposalOpen(false); }}>Enviar proposta</Button></DialogFooter></DialogContent></Dialog>

    <Dialog open={transactionOpen} onOpenChange={setTransactionOpen}><DialogContent><DialogHeader><DialogTitle>Confirme esta operação</DialogTitle><DialogDescription>Você está prestes a aceitar uma negociação no valor de {conversation.lastValue}. Esta ação será registrada.</DialogDescription></DialogHeader><Field label="Senha de transação"><Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }} placeholder="••••" /></Field>{passwordError && <p className="text-sm font-semibold text-destructive">Senha de transação inválida. Para a demonstração, use 1234.</p>}<p className="text-xs text-muted-foreground">Usuário responsável, data, horário, ação e status serão registrados.</p><DialogFooter><Button variant="outline" onClick={() => setTransactionOpen(false)}>Cancelar</Button><Button onClick={() => { const ok = confirmAgreement(id, password); if (ok) { setTransactionOpen(false); setPassword(""); } else setPasswordError(true); }}>Confirmar operação</Button></DialogFooter></DialogContent></Dialog>
  </AppShell>;
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) { return <label className={wide ? "md:col-span-2" : ""}><span className="mb-2 block text-sm font-semibold">{label}</span>{children}</label>; }