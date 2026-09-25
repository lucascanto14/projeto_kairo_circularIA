// Dados demonstrativos da CircularIA. Nenhuma informação real de empresas.

export type ProfileId = "pessoa-fisica" | "ofertante" | "reciclador" | "remanufaturador" | "segunda-vida" | "admin";

export type Plans = { intelligence: boolean };

export type Profile = {
  id: ProfileId;
  label: string;
  company: string;
  role: string;
  region: string;
  accountType: "PF" | "PJ";
  verification: VerificationStatus;
  plans: Plans;
};

export type VerificationStatus =
  | "Em análise"
  | "Empresa verificada"
  | "Pessoa Física verificada"
  | "Documentação pendente"
  | "Documentação rejeitada";

export const profiles: Profile[] = [
  { id: "pessoa-fisica", label: "Pessoa Física", company: "Lucas Almeida", role: "Pessoa física · ofertante", region: "Sudeste", accountType: "PF", verification: "Pessoa Física verificada", plans: { intelligence: false } },
  { id: "ofertante", label: "Empresa ofertante", company: "VoltFrota Mobilidade", role: "Ofertante de baterias", region: "Sudeste", accountType: "PJ", verification: "Empresa verificada", plans: { intelligence: false } },
  { id: "reciclador", label: "Reciclador", company: "CicloMetais Brasil", role: "Reciclador homologado", region: "Sudeste", accountType: "PJ", verification: "Empresa verificada", plans: { intelligence: true } },
  { id: "remanufaturador", label: "Remanufaturador", company: "ReCell Tecnologia", role: "Remanufaturador", region: "Sul", accountType: "PJ", verification: "Em análise", plans: { intelligence: false } },
  { id: "segunda-vida", label: "Consumidor de segunda vida", company: "EcoStorage Energia", role: "Consumidor de segunda vida", region: "Sudeste", accountType: "PJ", verification: "Empresa verificada", plans: { intelligence: true } },
  { id: "admin", label: "Administrador", company: "CircularIA", role: "Administração", region: "Nacional", accountType: "PJ", verification: "Empresa verificada", plans: { intelligence: true } },
];

export type Asset = {
  id: string;
  name: string;
  type: string;
  category: "Bateria" | "Componente eletrônico" | "Sistema de propulsão" | "Sistema de recarga";
  manufacturer: string;
  model: string;
  chemistry?: "NMC" | "LFP" | "NCA";
  capacity?: string;
  voltage: string;
  power?: string;
  partNumber?: string;
  compatibility?: string;
  qty: number;
  soh?: number | null;
  sohSource?: "Informado pelo proprietário" | "BMS" | "Diagnóstico externo" | "Documentação técnica";
  condition: string;
  tested: boolean;
  documentation: string;
  state: string;
  region: string;
  city: string;
  status: "Disponível" | "Em negociação" | "Operação concluída" | "Em análise";
  goal: string;
  matches: number;
};

export const assets: Asset[] = [
  { id: "BAT-00192", name: "Pack NMC 72 kWh", type: "Pack de bateria", category: "Bateria", manufacturer: "Fabricante demonstrativo", model: "Pack NMC 72", chemistry: "NMC", capacity: "72 kWh", voltage: "400 V", qty: 8, soh: 78, sohSource: "Diagnóstico externo", condition: "Retirada de operação", tested: true, documentation: "Laudo externo disponível", state: "SP", region: "Sudeste", city: "São Paulo (região aproximada)", status: "Em negociação", goal: "Aberto à recomendação da plataforma", matches: 5 },
  { id: "BAT-00207", name: "Pack LFP 52 kWh", type: "Pack de bateria", category: "Bateria", manufacturer: "Fabricante demonstrativo", model: "Pack LFP 52", chemistry: "LFP", capacity: "52 kWh", voltage: "350 V", qty: 1, soh: 74, sohSource: "BMS", condition: "Retirada de operação", tested: true, documentation: "Dados de BMS disponíveis", state: "SP", region: "Sudeste", city: "São José dos Campos (região aproximada)", status: "Disponível", goal: "Segunda vida", matches: 3 },
  { id: "BAT-00318", name: "Módulos NMC 5 kWh", type: "Módulo de bateria", category: "Bateria", manufacturer: "Fabricante demonstrativo", model: "Módulo NMC 5", chemistry: "NMC", capacity: "5 kWh", voltage: "48 V", qty: 24, soh: 82, sohSource: "Informado pelo proprietário", condition: "Em operação", tested: true, documentation: "Ficha técnica disponível", state: "SP", region: "Sudeste", city: "Campinas (região aproximada)", status: "Disponível", goal: "Remanufatura", matches: 6 },
  { id: "BMS-00512", name: "BMS veicular 400 V", type: "BMS", category: "Componente eletrônico", manufacturer: "E-Motion Systems", model: "BMS-X400", voltage: "400 V", power: "12 W", partNumber: "BMS-X400-BR", compatibility: "Packs NMC e LFP de 350–450 V", qty: 18, condition: "Funcional, retirado de frota", tested: true, documentation: "Laudo funcional disponível", state: "SP", region: "Sudeste", city: "Sorocaba (região aproximada)", status: "Disponível", goal: "Reutilização", matches: 4 },
  { id: "INV-00604", name: "Inversor de tração 150 kW", type: "Inversor", category: "Componente eletrônico", manufacturer: "DriveCore", model: "DC-150", voltage: "400 V", power: "150 kW", partNumber: "INV-DC150-02", compatibility: "Motores síncronos 350–450 V", qty: 6, condition: "Recondicionado", tested: true, documentation: "Relatório de bancada disponível", state: "MG", region: "Sudeste", city: "Belo Horizonte (região aproximada)", status: "Disponível", goal: "Recondicionamento", matches: 7 },
  { id: "OBC-00731", name: "Carregador embarcado 11 kW", type: "Carregador embarcado", category: "Sistema de recarga", manufacturer: "ChargeLab", model: "OBC-11", voltage: "400 V", power: "11 kW", partNumber: "OBC11-T2", compatibility: "Entrada trifásica, conector Tipo 2", qty: 12, condition: "Usado, não testado", tested: false, documentation: "Ficha técnica disponível", state: "PR", region: "Sul", city: "Curitiba (região aproximada)", status: "Em análise", goal: "Reparo", matches: 3 },
  { id: "MOT-00842", name: "Motor elétrico 90 kW", type: "Motor elétrico", category: "Sistema de propulsão", manufacturer: "E-Drive", model: "ED90", voltage: "360 V", power: "90 kW", partNumber: "ED90-360", compatibility: "Plataformas leves de 300–400 V", qty: 4, condition: "Funcional", tested: true, documentation: "Diagnóstico externo disponível", state: "RS", region: "Sul", city: "Porto Alegre (região aproximada)", status: "Disponível", goal: "Remanufatura", matches: 5 },
];

export type Counterpart = {
  code: string;
  type: "Reciclador" | "Remanufaturador" | "Consumidor de segunda vida" | "Operador logístico" | "Parceiro de diagnóstico" | "Ativos disponíveis";
  region: string;
  state: string;
  chemistries: string[];
  rating: number;
  operations: number;
  demands: number;
  realName: string;
  lat: number;
  lng: number;
};

export const counterparts: Counterpart[] = [
  { code: "#1842", type: "Remanufaturador", region: "Sudeste", state: "SP", chemistries: ["NMC", "LFP"], rating: 4.8, operations: 27, demands: 4, realName: "ReCell Tecnologia Ltda (demonstrativo)", lat: -23.19, lng: -45.88 },
  { code: "#5281", type: "Consumidor de segunda vida", region: "Sudeste", state: "SP", chemistries: ["LFP", "NMC"], rating: 4.6, operations: 19, demands: 6, realName: "EcoStorage Energia S.A. (demonstrativo)", lat: -22.9, lng: -47.06 },
  { code: "#8714", type: "Reciclador", region: "Sudeste", state: "MG", chemistries: ["NMC", "NCA", "LFP"], rating: 4.4, operations: 41, demands: 3, realName: "CicloMetais Brasil (demonstrativo)", lat: -19.92, lng: -43.94 },
  { code: "#3390", type: "Operador logístico", region: "Sul", state: "PR", chemistries: ["Todas"], rating: 4.5, operations: 33, demands: 2, realName: "TransCargo Sul (demonstrativo)", lat: -25.43, lng: -49.27 },
  { code: "#4127", type: "Parceiro de diagnóstico", region: "Sudeste", state: "RJ", chemistries: ["NMC", "LFP"], rating: 4.9, operations: 58, demands: 1, realName: "DiagPower Ensaios (demonstrativo)", lat: -22.91, lng: -43.17 },
  { code: "#6603", type: "Reciclador", region: "Nordeste", state: "PE", chemistries: ["LFP"], rating: 4.2, operations: 11, demands: 2, realName: "NordCiclo Materiais (demonstrativo)", lat: -8.05, lng: -34.9 },
  { code: "#7719", type: "Consumidor de segunda vida", region: "Centro-Oeste", state: "GO", chemistries: ["LFP"], rating: 4.1, operations: 7, demands: 3, realName: "SolarCerrado Energia (demonstrativo)", lat: -16.68, lng: -49.25 },
  { code: "#9042", type: "Remanufaturador", region: "Sul", state: "RS", chemistries: ["NMC"], rating: 4.3, operations: 15, demands: 2, realName: "PampaCell (demonstrativo)", lat: -30.03, lng: -51.23 },
  { code: "#2255", type: "Ativos disponíveis", region: "Norte", state: "AM", chemistries: ["NMC"], rating: 4.0, operations: 4, demands: 1, realName: "AmazonFrota (demonstrativo)", lat: -3.12, lng: -60.02 },
  { code: "#1190", type: "Ativos disponíveis", region: "Sudeste", state: "SP", chemistries: ["NMC", "LFP"], rating: 4.7, operations: 22, demands: 5, realName: "VoltFrota Mobilidade (demonstrativo)", lat: -23.55, lng: -46.63 },
];

export type MatchFactor = { label: string; weight: number; ok: boolean };
export type Match = {
  assetId: string;
  code: string;
  score: number;
  purpose: string;
  distance: string;
  reasons: string[];
  factors: MatchFactor[];
};

export const matches: Match[] = [
  {
    assetId: "BAT-00192", code: "#1842", score: 91, purpose: "Remanufatura", distance: "≈ 90 km",
    reasons: ["Química compatível", "SoH dentro da faixa solicitada", "Demanda ativa", "Quantidade compatível", "Distância favorável"],
    factors: [{ label: "Química", weight: 100, ok: true }, { label: "SoH informado", weight: 88, ok: true }, { label: "Quantidade", weight: 92, ok: true }, { label: "Localização aproximada", weight: 86, ok: true }, { label: "Perfil de demanda", weight: 94, ok: true }, { label: "Finalidade possível", weight: 90, ok: true }],
  },
  {
    assetId: "BAT-00192", code: "#5281", score: 84, purpose: "Segunda vida",
    distance: "≈ 95 km",
    reasons: ["Química compatível", "Aplicação estacionária compatível", "Capacidade de absorção declarada", "Demanda ativa"],
    factors: [{ label: "Química", weight: 95, ok: true }, { label: "SoH informado", weight: 80, ok: true }, { label: "Quantidade", weight: 78, ok: true }, { label: "Localização aproximada", weight: 84, ok: true }, { label: "Perfil de demanda", weight: 88, ok: true }, { label: "Finalidade possível", weight: 82, ok: true }],
  },
  {
    assetId: "BAT-00192", code: "#8714", score: 72, purpose: "Reciclagem",
    distance: "≈ 490 km",
    reasons: ["Aceita química NMC", "Capacidade disponível", "Destino alternativo garantido"],
    factors: [{ label: "Química", weight: 92, ok: true }, { label: "SoH informado", weight: 55, ok: false }, { label: "Quantidade", weight: 80, ok: true }, { label: "Localização aproximada", weight: 48, ok: false }, { label: "Perfil de demanda", weight: 70, ok: true }, { label: "Finalidade possível", weight: 75, ok: true }],
  },
];

export const futureCriteria = [
  "Tipo de ativo", "Fabricante e modelo", "Compatibilidade técnica", "Condição funcional", "Custo logístico", "Valor residual", "Impacto ambiental", "Capacidade operacional",
];

export const demandProfile = {
  type: "Pack de bateria, BMS e inversor",
  category: "Baterias e eletrônica de potência",
  chemistry: "NMC / LFP",
  capacity: "40 a 80 kWh",
  voltage: "350 a 450 V",
  power: "Até 180 kW",
  compatibility: "Plataformas veiculares leves e armazenamento estacionário",
  qty: "Até 20 unidades por mês",
  condition: "Retirada de operação, sem avarias estruturais",
  minSoh: "65%",
  region: "Sudeste e Sul",
  purpose: "Segunda vida em armazenamento estacionário",
  absorption: "20 packs/mês",
  frequency: "Mensal",
  notes: "Preferência por lotes com diagnóstico externo recente.",
};

export const negotiationStatuses = [
  "Conversa iniciada", "Proposta enviada", "Contraproposta recebida", "Em negociação", "Acordo em análise", "Acordo fechado", "Pagamento da taxa pendente", "Identidades liberadas", "Operação concluída",
] as const;
export type NegotiationStatus = (typeof negotiationStatuses)[number];

export type Message = { id: string; from: "me" | "them" | "system"; text: string; at: string; blocked?: boolean };
export type Proposal = { id: string; from: "me" | "them"; qty: number; unit: string; total: string; term: string; conditions: string; notes: string; at: string };

export type Conversation = {
  id: string;
  assetId: string;
  code: string;
  purpose: string;
  score: number;
  status: NegotiationStatus;
  identityRevealed: boolean;
  feePaid: boolean;
  lastValue: string;
  messages: Message[];
  proposals: Proposal[];
  log: { who: string; action: string; at: string; status: string }[];
};

const now = "20/09/2026";

export const initialConversations: Conversation[] = [
  {
    id: "CONV-001", assetId: "BAT-00192", code: "#1842", purpose: "Remanufatura", score: 91,
    status: "Em negociação", identityRevealed: false, feePaid: false, lastValue: "R$ X (a definir)",
    messages: [
      { id: "m1", from: "them", text: "Temos interesse no lote de 8 baterias. O SoH informado de 78% é referente ao último diagnóstico?", at: `${now} 09:12` },
      { id: "m2", from: "me", text: "Sim. O diagnóstico externo foi realizado há aproximadamente 30 dias.", at: `${now} 09:20` },
      { id: "m3", from: "them", text: "Temos interesse em remanufatura para nova aplicação. Podemos enviar uma proposta.", at: `${now} 09:26` },
    ],
    proposals: [], log: [],
  },
  {
    id: "CONV-002", assetId: "BAT-00192", code: "#5281", purpose: "Segunda vida", score: 84,
    status: "Proposta enviada", identityRevealed: false, feePaid: false, lastValue: "R$ X (a definir)",
    messages: [
      { id: "m1", from: "them", text: "Conseguimos absorver o lote completo para aplicação estacionária. Qual a condição de retirada?", at: `${now} 08:40` },
      { id: "m2", from: "me", text: "Retirada de operação, sem avarias estruturais registradas na documentação.", at: `${now} 08:52` },
    ],
    proposals: [{ id: "p1", from: "them", qty: 8, unit: "R$ X", total: "R$ X", term: "30 dias", conditions: "Coleta por conta do comprador", notes: "Proposta demonstrativa.", at: `${now} 09:00` }],
    log: [],
  },
  {
    id: "CONV-003", assetId: "BAT-00192", code: "#8714", purpose: "Reciclagem", score: 72,
    status: "Conversa iniciada", identityRevealed: false, feePaid: false, lastValue: "—",
    messages: [{ id: "m1", from: "them", text: "Podemos receber o lote para recuperação de materiais críticos, caso a segunda vida não avance.", at: `${now} 07:55` }],
    proposals: [], log: [],
  },
  {
    id: "CONV-004", assetId: "BAT-00318", code: "#9042", purpose: "Remanufatura", score: 79,
    status: "Acordo fechado", identityRevealed: false, feePaid: false, lastValue: "R$ X (a definir)",
    messages: [{ id: "m1", from: "them", text: "Fechamos nas condições combinadas. Aguardando confirmação final na plataforma.", at: `19/09/2026 16:30` }],
    proposals: [{ id: "p1", from: "me", qty: 24, unit: "R$ X", total: "R$ X", term: "15 dias", conditions: "Coleta compartilhada", notes: "Demonstrativo.", at: "19/09/2026 16:10" }],
    log: [],
  },
];

export const TRANSACTION_PASSWORD = "1234";
