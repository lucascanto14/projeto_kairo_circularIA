# CircularIA - Guia da Interface do Usuario (UI/UX) 

## Introducao e Objetivo do Projeto

A CircularIA e uma plataforma digital B2B e B2C desenvolvida para conectar proprietarios de baterias e componentes pos-primeira vida (como montadoras, concessionarias, frotistas e pessoas fisicas) a recicladores, remanufaturadores e consumidores de segunda vida. 

---

## Demonstracao e Preview do Modelo

Voce pode visualizar a demonstracao da interface e navegacao interativa atraves do link abaixo:

* [Exibicao do Modelo / Preview da Aplicacao](https://loop-smart-match.lovable.app)

---

## Videos e Tutoriais de Uso

Esta secao contem os guias em video para demonstrar as principais funcionalidades da plataforma:

### 1. Visao Geral e Navegacao 
<!-- Insira aqui o video de navegacao na vitrine e filtros -->
[Visao Geral](https://www.youtube.com/watch?v=TSSEjZI6zi4&list=PLGuaDXm5A0qY&index=2)
### 2. Cadastro e login
<!-- Insira aqui o video tutorial de cadastro de novo ativo -->
[Cadastro e login](https://www.youtube.com/watch?v=6h5V-Ctzqn4&list=PLGuaDXm5A0qY&index=2)

---

## Visao Geral da Interface

A interface web da CircularIA organiza-se em torno da jornada de conexao entre ofertantes e demandantes de baterias e componentes pos-primeira vida:


# CircularIA — Destrinchamento das Telas e Componentes

Documentação das principais telas, componentes e fluxos da plataforma **CircularIA — Plataforma Inteligente de Circularidade de Baterias**.

---

## 1. Login e Cadastro (`/login` e `/cadastro`)

Porta de entrada da plataforma, responsável pela autenticação e criação de contas para Pessoa Física e Pessoa Jurídica.

- Login com e-mail e senha.
- Recuperação de senha.
- Botão para criação de nova conta.
- Escolha entre cadastro como **Pessoa Física** ou **Pessoa Jurídica**.
- Possibilidade de acesso por perfis demonstrativos.
- Criação de senha de acesso.
- Criação de senha de transação.
- Processo de verificação de identidade, documentação e habilitação técnica, quando aplicável.

---

## 2. Vitrine e Marketplace (`/marketplace`)

Área de exploração e busca dos ativos disponíveis na plataforma.

- Cards de ativos exibindo imagem/ícone, modelo, fabricante, química, capacidade, Estado de Saúde (SoH), quantidade e localização aproximada.
- Barra de busca com filtros por química, capacidade, tensão, SoH mínimo, região e finalidade desejada.
- Visualização de oportunidades para **Segunda Vida**, **Remanufatura** ou **Reciclagem**.
- Identidade dos usuários e empresas permanece anonimizada durante a negociação preliminar.
- Botões para visualizar detalhes, demonstrar interesse e iniciar conversa.

---

## 3. Detalhes do Ativo (`/ativo/:id`)

Apresentação completa das especificações técnicas de uma bateria ou componente.

- Ficha técnica com identificação, fabricante, modelo, ano, quantidade e dados elétricos/físicos.
- Indicação da química da bateria.
- Exibição da condição conhecida e do SoH, quando disponível.
- Origem dos dados técnicos:
  - BMS.
  - Diagnóstico externo.
  - Documentação técnica.
  - Declaração do proprietário.
- Localização aproximada para preservação da privacidade.
- Indicação da finalidade pretendida.
- Visualização de matches associados ao ativo.
- Botão para iniciar contato ou negociação.

---

## 4. Formulário de Cadastro de Ativo (`/cadastrar-ativo`)

Fluxo guiado em etapas para registro de novos ativos.

- **Passo 1:** identificação geral:
  - Tipo do ativo.
  - Fabricante.
  - Modelo.
  - Ano.
  - Identificador interno.
  - Quantidade.
- **Passo 2:** especificações técnicas:
  - Química.
  - Tensão nominal.
  - Capacidade.
  - Peso.
  - Condição.
  - SoH.
- **Passo 3:** origem dos dados:
  - BMS.
  - Diagnóstico externo.
  - Documentação técnica.
  - Declaração.
- **Passo 4:** localização:
  - Estado.
  - Cidade/região aproximada.
- **Passo 5:** finalidade:
  - Segunda Vida.
  - Remanufatura.
  - Reciclagem.
  - Aberto à recomendação.
- Indicador de completude do cadastro.
- Botão para publicação do ativo.

---

## 5. Matches Inteligentes (`/matches`)

Área em que a CircularIA apresenta os destinos e parceiros mais compatíveis para cada ativo.

- Ranking dos principais matches.
- Score de compatibilidade.
- Critérios considerados:
  - Tipo do ativo.
  - Química.
  - SoH.
  - Condição.
  - Quantidade.
  - Localização.
  - Distância aproximada.
  - Perfil de demanda.
  - Finalidade.
- Explicação dos fatores que contribuíram para o match.
- Parceiro exibido de forma anonimizada:
  - `Empresa Verificada #XXXX`
  - `Usuário Verificado #XXXX`
- Botão `Ver detalhes`.
- Botão `Iniciar conversa`.

> O matching funciona como ferramenta de **apoio à decisão**, não como certificação técnica.

---

## 6. Conversas e Negociações (`/conversas`)

Interface de comunicação entre ofertantes e interessados.

- Lista de todas as conversas da conta.
- Cada conversa vinculada a:
  - Ativo.
  - Match.
  - Ofertante.
  - Interessado.
- Cabeçalho com:
  - Bateria relacionada.
  - Parceiro anonimizado.
  - Percentual de compatibilidade.
  - Status da negociação.
- Histórico de mensagens.
- Campo para envio de mensagens.
- Botão para envio de proposta.
- Possibilidade de contraproposta.

### Status possíveis

- Conversa iniciada.
- Proposta enviada.
- Contraproposta recebida.
- Em negociação.
- Acordo em análise.
- Acordo fechado.
- Pagamento da taxa pendente.
- Identidades liberadas.
- Operação concluída.

---

## 7. Moderação Inteligente do Chat

Camada de proteção para manter as negociações dentro da CircularIA.

- Identificação de tentativas de compartilhamento de:
  - Nome da empresa.
  - Razão social.
  - CPF/CNPJ.
  - Telefone.
  - WhatsApp.
  - E-mail.
  - Website.
  - Links.
  - Redes sociais.
  - Endereço.
- Utilização dos próprios dados cadastrais como referência para detecção.
- Bloqueio automático de mensagens com tentativa de contato externo.
- Exibição de mensagem de segurança.

### Exemplo

> **Informação de contato bloqueada**  
> Para garantir segurança, rastreabilidade e proteção das partes, informações de contato externo são liberadas somente após a conclusão do acordo dentro da CircularIA.

---

## 8. Propostas e Contrapropostas (`/negociacao/:id`)

Área estruturada para formalização das negociações.

- Quantidade negociada.
- Preço unitário.
- Valor total.
- Prazo.
- Condições comerciais.
- Observações.
- Botão `Enviar proposta`.
- Botão `Enviar contraproposta`.
- Botão `Aceitar`.
- Botão `Recusar`.

### Fluxo após o aceite

1. Confirmação do acordo.
2. Solicitação da senha de transação.
3. Cálculo da taxa CircularIA.
4. Simulação de pagamento.
5. Liberação das identidades.
6. Conclusão da operação.

---

## 9. Meus Ativos (`/baterias`)

Área de gerenciamento dos ativos cadastrados.

- Cards individuais com:
  - ID.
  - Tipo e categoria do ativo.
  - Fabricante, modelo e condição.
  - Química, capacidade e SoH quando for bateria.
  - Tensão, potência, compatibilidade e teste funcional quando for componente.
  - Status.
  - Quantidade de matches.
  - Conversas ativas.
- Botão `Ver ativo`.
- Botão `Ver matches`.
- Botão `Ver conversas`.
- Botão `Editar`.

Um mesmo ativo pode possuir várias negociações simultâneas com diferentes interessados.

---

## 10. Conversas por Bateria (`/minhas-baterias/:id/conversas`)

Visualização das negociações associadas especificamente a um ativo.

- Lista dos interessados.
- Identidade anonimizada.
- Tipo de interesse:
  - Segunda Vida.
  - Remanufatura.
  - Reciclagem.
- Status de cada negociação.
- Última mensagem.
- Última proposta.
- Link direto para a conversa.

---

## 11. Visão Geral (`/dashboard`)

Painel principal da conta, adaptado ao plano contratado.

### Marketplace gratuito

- Baterias cadastradas.
- Matches recebidos.
- Conversas ativas.
- Propostas enviadas.
- Propostas recebidas.
- Negociações em andamento.
- Operações concluídas.

### CircularIA Intelligence

Além dos itens anteriores:

- Indicadores agregados.
- Oferta e demanda.
- Principais químicas.
- Regiões com maior atividade.
- Tendências.
- Resumo de inteligência de mercado.

Usuários sem assinatura visualizam os recursos premium bloqueados.

---

## 12. Mapa da Circularidade (`/mapa`)

Ferramenta de inteligência geográfica exclusiva do **CircularIA Intelligence**.

- Mapa interativo do Brasil.
- Navegação e zoom.
- Seleção por estado ou região.
- Visualização por pontos.
- Clusters.
- Heatmap de Oferta.
- Heatmap de Demanda.
- Heatmap de Segunda Vida.
- Heatmap de Remanufatura.
- Heatmap de Reciclagem.

### Filtros

- Estado.
- Região.
- Química.
- Tipo de ativo.
- Tipo de agente.
- Tipo de destinação.

### Painel lateral

- Ativos disponíveis.
- Demandas ativas.
- Destinos cadastrados.
- Capacidade cadastrada.
- Distribuição por tipo de destinação.
- Química predominante.
- Matches potenciais.

### Privacidade

- Dados agregados.
- Dados anonimizados.
- Sem exposição de identidade.
- Sem exposição de localização exata.

---

## 13. Inteligência de Mercado (`/inteligencia`)

Dashboard analítico exclusivo do plano **CircularIA Intelligence**.

- Total de ativos cadastrados.
- Capacidade total cadastrada.
- Oferta.
- Demanda.
- Químicas predominantes.
- Regiões com maior atividade.
- Segunda Vida.
- Remanufatura.
- Reciclagem.
- Tempo médio até match.
- Tendências.
- Histórico.

### Componentes

- Cards.
- Gráficos.
- Tabelas.
- Filtros.
- Heatmaps.
- Indicadores.

---

## 14. Minha Conta — Pessoa Física (`/minha-conta`)

Área de gerenciamento do usuário individual.

- Meus Dados.
- Status de Verificação.
- Meus Ativos.
- Minhas Conversas.
- Segurança.
- Senha de transação.
- Plano e Serviços.
- Documentação profissional opcional quando aplicável.

---

## 16. Minha Empresa — Pessoa Jurídica (`/minha-empresa`)

Área de gerenciamento institucional.

- Perfil da Empresa.
- Razão social.
- Nome fantasia.
- CNPJ.
- Responsável legal.
- Responsável técnico, quando aplicável.
- Documentação e Verificação.
- Meus Ativos.
- Minhas Conversas.
- Usuários da Empresa.
- Plano e Serviços.
- Segurança.

---

## 17. Documentação e Verificação (`/verificacao`)

Central de validação de identidade e documentação.

- CPF ou CNPJ.
- Documento de identificação.
- Responsável legal.
- Responsável técnico.
- CREA, CRT ou outro registro, quando aplicável.
- Certificações técnicas.
- Documentos enviados.

### Status

- Enviado.
- Em análise.
- Validado.
- Pendente.
- Rejeitado.

### Selos

- `Pessoa Física Verificada`
- `Empresa Verificada`
- `Responsável Técnico Verificado`

---

## 18. Plano e Serviços (`/planos`)

Área de contratação e gerenciamento dos serviços CircularIA.

### Marketplace

- Uso gratuito.
- Taxa cobrada apenas no fechamento de uma operação.
- Taxa: `X% — a definir`.

### CircularIA Intelligence

Assinatura mensal para acesso a:

- Inteligência de mercado.
- Mapa da Circularidade.
- Pontos.
- Clusters.
- Heatmaps.
- Indicadores.
- Análises regionais.
- Tendências.

### Combinações possíveis

- Marketplace.
- Marketplace + Intelligence.

---

## 19. Segurança da Transação

Camada adicional de proteção para operações críticas.

- Senha de transação separada da senha de login.
- Solicitação da senha para:
  - Aceitar proposta final.
  - Confirmar acordo.
  - Autorizar pagamento.
  - Liberar identidades.
  - Confirmar destinação.

### Auditoria

Registrar:

- Usuário responsável.
- Data.
- Horário.
- Operação.
- Status.

---

## 20. Fluxo Completo da Operação

Fluxo principal da CircularIA:

```text
Cadastro
    ↓
Verificação
    ↓
Cadastro da Bateria
    ↓
Publicação no Marketplace
    ↓
Matching Inteligente
    ↓
Parceiro Anonimizado
    ↓
Início da Conversa
    ↓
Moderação Inteligente
    ↓
Proposta
    ↓
Contraproposta
    ↓
Acordo
    ↓
Senha de Transação
    ↓
Taxa CircularIA
    ↓
Pagamento
    ↓
Liberação das Identidades
    ↓
Conclusão da Operação
    ↓
Dados Anonimizados
    ↓
CircularIA Intelligence
