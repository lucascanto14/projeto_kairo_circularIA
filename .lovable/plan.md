# Ampliar a CircularIA para ativos da eletrificação

## Objetivo
Generalizar o protótipo existente para baterias, componentes eletrônicos e outros ativos da eletrificação, sem recriar o site nem alterar o modelo de negócio.

## Alterações
- Atualizar os principais textos institucionais e de navegação para refletir baterias e componentes, mantendo termos específicos de bateria onde necessário.
- Transformar o cadastro de ativo em um formulário adaptável: dados gerais para todos os ativos, campos de bateria com SoH e campos próprios para componentes eletrônicos.
- Ampliar os dados demonstrativos com BMS, inversor, carregador e motor elétrico, identificando claramente o tipo de cada ativo.
- Atualizar Marketplace, filtros e cards para mostrar atributos relevantes conforme o tipo selecionado.
- Generalizar o matching e o perfil de demanda com critérios comuns e critérios técnicos específicos por categoria, mantendo as justificativas explicáveis.
- Renomear “Minhas Baterias” para “Meus Ativos” e ajustar conversas, dashboard e oportunidade.
- Preparar Mapa e Intelligence com filtro e indicadores por tipo/categoria de ativo, sem criar análises avançadas novas.
- Preservar privacidade, anonimização, cadastro PF/PJ, negociação, planos, mapa exclusivo do Intelligence e todas as demais funções atuais.

## Validação
- Confirmar que o cadastro alterna corretamente entre bateria e componente.
- Testar filtros e cards do Marketplace, matches e Meus Ativos em desktop e celular.
- Verificar que rotas existentes continuam acessíveis e que o projeto permanece sem erros.

## Detalhes técnicos
- Manter a estrutura atual em React/TanStack e os componentes visuais existentes.
- Evoluir o modelo demonstrativo de ativos com categoria e atributos opcionais, evitando exibir SoH em itens não relacionados a baterias.
- Usar estado local apenas para os controles demonstrativos já existentes; nenhuma nova persistência ou serviço será criado.
