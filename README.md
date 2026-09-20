# CircularIA - Guia da Interface do Usuario (UI/UX) e Execucao

## Introducao e Objetivo do Projeto

A CircularIA e uma plataforma digital B2B e B2C desenvolvida para conectar proprietarios de baterias e componentes pos-primeira vida (como montadoras, concessionarias, frotistas e pessoas fisicas) a recicladores, remanufaturadores e consumidores de segunda vida[cite: 1]. 

O objetivo principal do projeto e criar uma camada digital de conexao e inteligencia de mercado que otimize a identificacao de destinos compativeis para cada ativo, reduzindo o esforco de busca, promovendo a rastreabilidade e prolongando o valor funcional e material das baterias no ecossistema de eletrificacao[cite: 1].

---

## Demonstracao e Preview do Modelo

Voce pode visualizar a demonstracao da interface e navegacao interativa atraves do link abaixo:

* [Exibicao do Modelo / Preview da Aplicacao](https://id-preview-a726bdbb--e7237fc5-c905-46d6-a12f-757bc35b9008.lovable.app/)

---

## Videos e Tutoriais de Uso

Esta secao contem os guias em video para demonstrar as principais funcionalidades da plataforma:

### 1. Visao Geral e Navegacao do Marketplace
<!-- Insira aqui o video de navegacao na vitrine e filtros -->
[![Tutorial - Visao Geral](https://img.youtube.com/vi/SEU_VIDEO_ID_AQUI/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID_AQUI)

### 2. Passo a Passo: Cadastro de Ativos e Baterias
<!-- Insira aqui o video tutorial de cadastro de novo ativo -->
[![Tutorial - Cadastro de Ativos](https://img.youtube.com/vi/SEU_VIDEO_ID_AQUI/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID_AQUI)

### 3. Funcionamento do Motor de Matching e Chat
<!-- Insira aqui o video demonstrando o aceite de match e chat -->
[![Tutorial - Matching e Chat](https://img.youtube.com/vi/SEU_VIDEO_ID_AQUI/maxresdefault.jpg)](https://www.youtube.com/watch?v=SEU_VIDEO_ID_AQUI)

---

## Visao Geral da Interface

A interface web da CircularIA organiza-se em torno da jornada de conexao entre ofertantes e demandantes de baterias e componentes pos-primeira vida:

Cadastro -> Visualizacao/Busca -> Matching Inteligente -> Negociacao/Contato -> Registro da Destinacao

---

## Destrinchamento das Telas e Componentes

### 1. Pagina Inicial / Dashboard (/)
Ponto de entrada e painel principal de controle do usuario:
* Metriciamento principal (KPIs): total de ativos cadastrados, oportunidades de matching ativas e resumo de destinacoes concluidas (Segunda Vida, Remanufatura, Reciclagem).
* Atalhos rapidos para cadastro de baterias e busca na vitrine.
* Menu de navegacao com acesso a Vitrine, Meus Anuncios, Minhas Demandas e Matches.

---

### 2. Vitrine e Marketplace (/marketplace)
Area de exploracao e busca dos ativos disponiveis:
* Cards de ativos exibindo imagem/icone, modelo, fabricante, quimica (ex: LFP, NMC), Estado de Saude (SoH) e localizacao aproximada.
* Barra de busca com filtros por quimica, faixa de capacidade, tensao, SoH minimo, regiao e finalidade desejada (Segunda Vida, Remanufatura ou Reciclagem).

---

### 3. Detalhes do Ativo (/ativo/:id)
Apresentacao completa das especificacoes tecnicas de uma bateria:
* Ficha tecnica: identificacao, fabricante, modelo, ano, quantidade e dados eletricos/fisicos.
* Origem dos dados: indicacao da fonte do SoH (Leitura BMS, Laudo Externo ou Declaracao do Proprietario).
* Localizacao aproximada para preservacao de privacidade durante a negociacao preliminar.
* Acao principal: botao para solicitacao de match e inicio de contato.

---

### 4. Formulario de Cadastro de Ativo (/cadastrar-ativo)
Fluxo guiado em etapas para registro de novos ativos:
* Passo 1: Identificacao geral (nome, fabricante, modelo, ano, quantidade).
* Passo 2: Especificacoes tecnicas (quimica, tensao nominal, capacidade, SoH).
* Passo 3: Origem dos dados tecnicos (BMS, Diagnostico Externo, Declaratorio).
* Passo 4: Localizacao e anexos de fotos ou documentacao tecnica.

---

### 5. Painel do Motor de Matching (/matches)
Interface de recomendacao e priorizacao de destinos:
* Lista de compatibilidades com exibicao de Indice de Compatibilidade (%).
* Detalhes explicativos dos fatores que geraram a pontuacao de compatibilidade.
* Acoes para aceite ou recusa do match gerado.

---

### 6. Perfil e Cadastro de Demanda (/demandas)
Area destinada a compradores e recicladores para definicao de criterios de absorcao:
* Formulario de criterios de compra: quimica aceita, faixa de SoH aceitavel, volume desejado e regiao geografica de interesse.

---

### 7. Central de Mensagens (/chat)
* Chat interno para comunicacao direta entre ofertante e demandante apos o aceite do match.
* Registro de desfecho final do ativo (Segunda Vida, Reciclado ou Remanufaturado).

---

## Como Executar o Projeto Localmente

Siga os passos abaixo para executar a aplicacao web em seu computador.

### Pre-requisitos
* Node.js (versao 18.x ou superior)
* npm ou yarn instalado

### Passo a Passo
 teste
1. Clone o repositorio:
```bash
git clone [https://github.com/lucascanto14/projeto_kairo_circularIA.git](https://github.com/lucascanto14/projeto_kairo_circularIA.git)
