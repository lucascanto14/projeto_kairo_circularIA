# CycleIA — Documentação de Interface do Usuário (UI/UX)

O **CycleIA** é uma plataforma inteligente e inclusiva de mobilidade sustentável, monitoramento telemétrico e logística otimizada voltada para o ecossistema de transporte e agronegócio. 

Esta documentação destrincha a arquitetura visual, os componentes de interface (UI) e a experiência do usuário (UX) disponíveis na versão web.

---

## Links do Projeto

* **Aplicação Web (Demonstração Interativa):** [Kairo CycleIA Web App](https://id-preview-a726bdbb--e7237fc5-c905-46d6-a12f-757bc35b9008.lovable.app/)

---

## Sistema de Design & Identidade Visual

* **Modo Padrão:** *Dark Mode* elegante com contraste acessível para ambientes rurais, urbanos e de alta luminosidade.
* **Paleta de Cores Principais:**
  * **Verde Neon / Esmeralda:** Representa eficiência energética, rotas sustentáveis e status operacional ideal.
  * **Azul Elétrico / Ciano:** Destinado a métricas térmicas, refrigeração da carga, conectividade IoT e inteligência de dados.
  * **Amarelo / Laranja (Alerta):** Pontos de atenção na rota, manutenção preventiva e oscilações térmicas brandas.
  * **Vermelho (Crítico):** Falhas mecânicas, picos de degradação térmica ou imprevistos graves no trajeto.
* **Tipografia:** Sans-serif moderna, otimizada para leitura rápida e legibilidade em telas de dispositivos móveis montados no painel de veículos.

---

## Mapeamento e Destrinchamento das Telas (UI)

### 1. Painel Principal (Dashboard de Operação)
A tela inicial reúne em tempo real todas as variáveis operacionais críticas do motorista e da frota.

* **Header (Barra Superior):**
  * Logo **Kairo / CycleIA** integrado com indicador de status de frota.
  * Barra de conectividade em tempo real (4G/Satélite) e relógio digital.
  * Seletor de perfil e central de notificações.
* **Widget de Rotas e Navegação GPS:**
  * Visão espacial interativa do trajeto agrícola/urbano.
  * Sobreposição de camada com severidade do piso (asfalto, terra batida, estradas vicinais acidentadas).
  * Indicação visual da **Rota Lean (Sustentável)** destacada em cor fluorescente.
* **Módulo de Eficiência Energética (Bateria / Tração):**
  * Indicador circular/barras do Estado de Carga da Bateria (SoC - *State of Charge*).
  * Gráfico de consumo dinâmico (Wh/km ou kWh/h).
  * Estimativa preditiva de autonomia restante calculada via IA.
* **Módulo de Refrigeração da Carga (Cold Chain):**
  * Termômetro digital em destaque com o valor da temperatura do baú frigorífico em tempo real (ex.: `+3.5°C`).
  * Indicador de estabilidade da cadeia do frio conforme o tipo de produto transportado (morangos, vegetais, carnes).

---

### 2. Módulo de Roteamento Preditivo e IA Contextual
Área voltada para o planejamento e ajuste inteligente de viagens.

* **Seletor de Carga & Sensibilidade:**
  * Formulário/Dropdown para definir a carga transportada, permitindo que a IA configure os limites de variação térmica aceitáveis.
* **Calculadora de Impacto Energético e Térmico:**
  * Comparativo entre a rota tradicional (mais curta em distância) e a **Rota Kairo/CycleIA** (otimizada para consumo de bateria e preservação da carga).
* **Alertas Preditivos de Bordo:**
  * Pop-ups e cards informativos avisando o condutor sobre trechos de alta trepidação, risco de elevação da temperatura interna ou orientação de pré-resfriamento na tomada.

---

### 3. Módulo de Telemetria e Saúde da Frota (BMS / Bateria)
Painel focado no monitoramento preditivo e na prevenção de desgastes da bateria e do sistema térmico.

* **Métricas de SoH (State of Health):**
  * Visualização da saúde global do pack de baterias e histórico de degradação acumulada.
* **Monitor Térmico das Células:**
  * Mapa de calor das células do pack de baterias e verificação de obstrução por poeira/sujeira nos dutos de ventilação.
* **Histórico de Recargas:**
  * Registros e recomendações de carregamento (AC vs. DC Rápido), prevenindo estresse térmico desnecessário nas baterias.

---

### 4. Componentes Globais e Acessibilidade (UX)

* **Barra de Navegação Inferior (Mobile Bottom Bar):**
  * Atalhos diretos para: `Mapa/Navegação`, `Relatórios de Carga`, `Telemetria`, `Suporte` e `Configurações`.
* **Design Responsivo:**
  * Adaptado nativamente para telas de smartphones, tablets industriais e centrais multimídia automotivas.
* **Atuação com Baixa Distração (Safety UX):**
  * Botões de ação rápida com áreas de toque amplas (*touch targets*), otimizadas para uso rápido pelo motorista em trânsito.

---

## Tecnologias de Interface Utilizadas

* **Framework Web:** React / Vite
* **Estilização:** Tailwind CSS (estilização utilitária rápida e temas customizados)
* **Componentes de UI:** Lucide React (iconografia) e componentes modulares
* **Design System / Prototipagem:** Lovable / Figma

---

## Como Executar o Projeto Localmente

```bash
# Clone o repositório
git clone [https://github.com/lucascanto14/projeto_kairo_cycleia.git](https://github.com/lucascanto14/projeto_kairo_cycleia.git)

# Acesse a pasta do projeto
cd projeto_kairo_cycleia

# Instale as dependências
npm install

# Execute a aplicação em ambiente de desenvolvimento
npm run dev
