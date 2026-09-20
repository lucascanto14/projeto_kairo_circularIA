# Atualização focada: acesso PF/PJ e Mapa Intelligence

## Objetivo
Preservar os fluxos atuais da CircularIA e alterar somente duas áreas: uma experiência demonstrativa de cadastro/login para pessoa física e jurídica, e o Mapa da Circularidade totalmente exclusivo do CircularIA Intelligence.

## 1. Cadastro e login demonstrativos
- Adicionar na tela inicial os acessos **Entrar** e **Criar conta**.
- Criar uma rota de entrada com e-mail, senha, recuperação demonstrativa e seis atalhos de perfis de demonstração.
- Criar um cadastro em etapas, começando pela escolha **Pessoa Física / Pessoa Jurídica**.
- Para PF, incluir dados pessoais, perfil de uso, verificações, documento, senha de acesso e senha de transação; registro profissional será opcional.
- Para PJ, incluir dados da empresa, perfis de atuação, responsável legal, pergunta condicional sobre responsável técnico, documentação, senha de acesso e senha de transação.
- Simular envio e conclusão com status claros e a mensagem institucional de verificação solicitada.
- Adicionar o perfil demonstrativo **Pessoa Física**, preservando os cinco perfis atuais.
- Adaptar o menu para exibir **Minha Conta** para PF e **Minha Empresa** para PJ, mantendo as páginas e fluxos existentes.
- Guardar apenas o estado demonstrativo necessário no navegador; não implementar autenticação real nem armazenar documentos ou senhas reais.

## 2. Mapa exclusivo do CircularIA Intelligence
- Marcar a aba do mapa com cadeado quando o perfil não tiver Intelligence.
- Para perfis gratuitos, substituir integralmente o conteúdo do mapa pela mensagem de recurso Intelligence e pelo botão **Conhecer CircularIA Intelligence**.
- Para perfis Intelligence, manter o mapa real e implementar modos visuais funcionais: Pontos, Oferta, Demanda, Segunda Vida, Remanufatura e Reciclagem.
- Fazer cada modo alterar os marcadores/intensidades do mapa, sem botões inertes.
- Tornar funcionais os filtros de estado, região, química, tipo de ativo, agente e destinação.
- Ao selecionar estado/região, reenquadrar o mapa e atualizar o resumo lateral com indicadores demonstrativos agregados.
- Manter anonimização: códigos, regiões aproximadas e dados agregados, nunca identidade ou localização exata.

## Validação
- Validar criação PF e PJ, campos condicionais, status e entrada pelos seis perfis demonstrativos.
- Confirmar **Minha Conta** para PF e **Minha Empresa** para PJ.
- Confirmar que o perfil gratuito não renderiza mapa nem dados geográficos.
- Confirmar que um perfil Intelligence alterna os seis modos, filtra NMC, seleciona São Paulo e atualiza mapa e painel.
- Verificar desktop e mobile, erros da prévia e metadados das novas páginas.

## Detalhes técnicos
- Manter TanStack Router, componentes e tokens visuais atuais.
- Usar rotas públicas dedicadas para entrada e cadastro de conta.
- Implementar autenticação e uploads como simulação local, pois esta etapa não exige serviço externo nem persistência real.
- Usar círculos proporcionais e agrupamentos visuais no Leaflet para representar heatmaps sem adicionar uma dependência incompatível.
