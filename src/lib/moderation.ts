// Camada demonstrativa de moderação: identifica tentativas de contato externo.

const spelled = ["zero", "um", "uma", "dois", "duas", "tres", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte"];

const keywords = [
  "whatsapp", "whats", "zap", "telefone", "celular", "e-mail", "email", "gmail", "hotmail", "outlook",
  "instagram", "linkedin", "facebook", "site", "website", "www", "http", "cnpj", "razão social", "razao social",
  "nome fantasia", "endereço", "endereco", "rua ", "avenida", "telegram", "contato direto", "fora da plataforma",
];

export type ModerationResult = { blocked: boolean; reason?: string };

export function moderateMessage(text: string, companyTerms: string[] = []): ModerationResult {
  const raw = text.toLowerCase();
  const normalized = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(raw)) return { blocked: true, reason: "e-mail" };
  if (/(https?:\/\/|www\.|\.com|\.br\b)/i.test(raw)) return { blocked: true, reason: "link ou website" };
  if (/\d[\d\s().-]{7,}\d/.test(raw)) return { blocked: true, reason: "telefone" };
  if (/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/.test(raw)) return { blocked: true, reason: "CNPJ" };

  const words = normalized.split(/[^a-z0-9]+/).filter(Boolean);
  let run = 0;
  for (const w of words) {
    if (spelled.includes(w) || /^\d{1,2}$/.test(w)) {
      run += 1;
      if (run >= 4) return { blocked: true, reason: "telefone" };
    } else run = 0;
  }

  for (const k of keywords) {
    if (normalized.includes(k.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
      return { blocked: true, reason: "informação de contato externo" };
    }
  }

  for (const term of companyTerms) {
    const t = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (t.length > 3 && normalized.includes(t)) return { blocked: true, reason: "identificação da empresa" };
  }

  return { blocked: false };
}

export const moderationNotice =
  "Informação de contato bloqueada. Para garantir segurança, rastreabilidade e proteção das empresas envolvidas, informações que permitam contato externo são liberadas somente após a conclusão do acordo dentro da CircularIA.";

export const moderationExamples = [
  "Pode falar comigo no onze nove oito sete seis...",
  "Meu e-mail é comercial@empresa.com.br",
  "Nosso CNPJ é 12.345.678/0001-90",
  "Segue nosso site para fechar direto",
];
