# Plano — Protótipo CircularIA

## Objetivo
Criar um protótipo B2B responsivo e navegável para apresentação no Hackathon Jump Start 2026, demonstrando cadastro de ativos, matching explicável por IA e inteligência de mercado.

## Experiência e navegação
- Criar uma página inicial institucional com a proposta, o fluxo de circularidade e os três destinos de maior valor.
- Criar uma área interna com navegação lateral para: Visão Geral, Marketplace, Cadastrar Ativo, Matches da IA, Mapa da Circularidade, Inteligência de Mercado, Minhas Baterias, Minha Empresa e Jornada da Bateria.
- Manter os fluxos principais conectados: cadastrar ativo → analisar oportunidades → comparar matches → abrir oportunidade.
- Incluir estados interativos demonstrativos nos filtros, formulário em quatro etapas, interesses no marketplace e marcadores do mapa.

## Telas
1. Landing page com proposta, CTA e fluxo de funcionamento.
2. Dashboard com indicadores e gráficos de destinos e químicas.
3. Cadastro em quatro etapas, incluindo o aviso obrigatório sobre SoH.
4. Resultado da IA com três matches, scoring demonstrativo e explicação dos fatores.
5. Marketplace com filtros e cards de ativos.
6. Mapa visual do Brasil com categorias e gargalos regionais.
7. Inteligência da Circularidade com distribuição regional, mercados, tendências e insight demonstrativo.
8. Perfil da EcoStorage Energia com interesses, capacidade, oportunidades e histórico.
9. Jornada visual de rastreabilidade da bateria.

## Direção visual
- Interface corporativa e industrial, desktop-first e responsiva.
- Azul-marinho, superfícies claras em branco/cinza e turquesa para circularidade.
- Tipografia tecnológica, ícones minimalistas, gráficos e indicadores densos, sem estética de folhas ou natureza genérica.
- Animações discretas de entrada, progresso e interação, respeitando redução de movimento.

## Regras de demonstração
- Identificar números, empresas, matches, tendências e transações como demonstrativos ou fictícios.
- Apresentar a IA como apoio à decisão com fatores explicáveis, nunca como garantia técnica ou de segurança.
- Não alegar diagnóstico físico, sensores ou integração real com BMS.

## Implementação técnica
- Organizar a experiência em rotas TanStack, com componentes reutilizáveis para navegação, indicadores, gráficos, badges e cards.
- Criar tokens semânticos no sistema visual e carregar fontes pela página raiz.
- Usar dados locais de demonstração e lógica de scoring no navegador, sem backend.
- Validar navegação, formulário, layout desktop/mobile e ausência de erros na prévia.
- Adicionar títulos e descrições sociais próprios para cada tela.
