import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  initialConversations, profiles, TRANSACTION_PASSWORD,
  type Conversation, type Message, type NegotiationStatus, type Plans, type Profile, type ProfileId, type VerificationStatus,
} from "./demo-data";
import { moderateMessage, moderationNotice } from "./moderation";

type Ctx = {
  profile: Profile;
  profileId: ProfileId;
  setProfileId: (id: ProfileId) => void;
  plans: Plans;
  togglePlan: (plan: keyof Plans) => void;
  verification: VerificationStatus;
  setVerification: (v: VerificationStatus) => void;
  conversations: Conversation[];
  getConversation: (id: string) => Conversation | undefined;
  sendMessage: (id: string, text: string) => { blocked: boolean; reason?: string };
  sendProposal: (id: string, p: { qty: number; unit: string; total: string; term: string; conditions: string; notes: string }) => void;
  receiveCounter: (id: string) => void;
  setStatus: (id: string, status: NegotiationStatus) => void;
  confirmAgreement: (id: string, password: string) => boolean;
  payFee: (id: string) => void;
  completeOperation: (id: string) => void;
};

const CircularContext = createContext<Ctx | null>(null);

const stamp = () => new Date().toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
const uid = () => Math.random().toString(36).slice(2, 9);

export function CircularProvider({ children }: { children: ReactNode }) {
  const [profileId, setProfileId] = useState<ProfileId>("ofertante");
  const base = profiles.find((p) => p.id === profileId) ?? profiles[0]!;
  const [plansByProfile, setPlansByProfile] = useState<Record<string, Plans>>(() =>
    Object.fromEntries(profiles.map((p) => [p.id, { ...p.plans }])),
  );
  const [verificationByProfile, setVerificationByProfile] = useState<Record<string, VerificationStatus>>(() =>
    Object.fromEntries(profiles.map((p) => [p.id, p.verification])),
  );
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("circularia-demo") : null;
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      if (data.profileId) setProfileId(data.profileId);
      if (data.plansByProfile) setPlansByProfile(data.plansByProfile);
      if (data.verificationByProfile) setVerificationByProfile(data.verificationByProfile);
      if (data.conversations) setConversations(data.conversations);
    } catch { /* ignora estado inválido */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("circularia-demo", JSON.stringify({ profileId, plansByProfile, verificationByProfile, conversations }));
  }, [profileId, plansByProfile, verificationByProfile, conversations]);

  const plans = plansByProfile[profileId] ?? base.plans;
  const verification = verificationByProfile[profileId] ?? base.verification;

  const update = useCallback((id: string, fn: (c: Conversation) => Conversation) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? fn(c) : c)));
  }, []);

  const addLog = (c: Conversation, action: string, status: string): Conversation => ({
    ...c,
    log: [...c.log, { who: `${base.company} · responsável demonstrativo`, action, at: stamp(), status }],
  });

  const value: Ctx = {
    profile: { ...base, plans, verification },
    profileId,
    setProfileId,
    plans,
    togglePlan: (plan) => setPlansByProfile((prev) => ({ ...prev, [profileId]: { ...(prev[profileId] ?? base.plans), [plan]: !(prev[profileId] ?? base.plans)[plan] } })),
    verification,
    setVerification: (v) => setVerificationByProfile((prev) => ({ ...prev, [profileId]: v })),
    conversations,
    getConversation: (id) => conversations.find((c) => c.id === id),
    sendMessage: (id, text) => {
      const result = moderateMessage(text, [base.company, "circularia demo"]);
      const msg: Message = result.blocked
        ? { id: uid(), from: "me", text, at: stamp(), blocked: true }
        : { id: uid(), from: "me", text, at: stamp() };
      update(id, (c) => ({
        ...c,
        messages: [
          ...c.messages,
          msg,
          ...(result.blocked ? [{ id: uid(), from: "system" as const, text: moderationNotice, at: stamp() }] : []),
        ],
        status: c.status === "Conversa iniciada" && !result.blocked ? "Em negociação" : c.status,
      }));
      return result;
    },
    sendProposal: (id, p) =>
      update(id, (c) =>
        addLog({
          ...c,
          proposals: [...c.proposals, { id: uid(), from: "me", at: stamp(), ...p }],
          lastValue: p.total || "R$ X (a definir)",
          status: "Proposta enviada",
          messages: [...c.messages, { id: uid(), from: "system", text: `Proposta enviada: ${p.qty} unidade(s) · valor total ${p.total || "R$ X"} · prazo ${p.term || "a definir"}.`, at: stamp() }],
        }, "Proposta enviada", "Proposta enviada"),
      ),
    receiveCounter: (id) =>
      update(id, (c) => ({
        ...c,
        proposals: [...c.proposals, { id: uid(), from: "them", at: stamp(), qty: c.proposals.at(-1)?.qty ?? 8, unit: "R$ X", total: "R$ X", term: "45 dias", conditions: "Coleta compartilhada", notes: "Contraproposta demonstrativa." }],
        status: "Contraproposta recebida",
        messages: [...c.messages, { id: uid(), from: "them", text: "Recebemos a proposta. Enviamos uma contraproposta com ajuste de prazo e divisão da coleta.", at: stamp() }],
      })),
    setStatus: (id, status) => update(id, (c) => addLog({ ...c, status }, `Status alterado para ${status}`, status)),
    confirmAgreement: (id, password) => {
      if (password !== TRANSACTION_PASSWORD) return false;
      update(id, (c) => addLog({ ...c, status: "Pagamento da taxa pendente" }, "Acordo confirmado com senha de transação", "Pagamento da taxa pendente"));
      return true;
    },
    payFee: (id) => update(id, (c) => addLog({ ...c, feePaid: true, identityRevealed: true, status: "Identidades liberadas" }, "Taxa CircularIA processada (simulação)", "Identidades liberadas")),
    completeOperation: (id) => update(id, (c) => addLog({
      ...c,
      status: "Operação concluída",
      messages: [...c.messages, { id: uid(), from: "system", text: "Operação concluída. Os dados anonimizados passam a alimentar os indicadores agregados do CircularIA Intelligence.", at: stamp() }],
    }, "Operação concluída; dados anonimizados agregados ao CircularIA Intelligence", "Operação concluída")),
  };

  return <CircularContext.Provider value={value}>{children}</CircularContext.Provider>;
}

export function useCircular() {
  const ctx = useContext(CircularContext);
  if (!ctx) throw new Error("useCircular precisa estar dentro de CircularProvider");
  return ctx;
}

export function usePlans() {
  const { plans } = useCircular();
  return useMemo(() => plans, [plans]);
}
