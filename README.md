==================================================
🎨 SISTEMA DE ESTILOS (FRONTEND)
==================================================

O frontend utiliza Tailwind CSS juntamente com um sistema de classes
globais definido em globals.css.

A ideia é evitar repetição de classes, manter consistência visual e
facilitar futuras alterações de tema, cores e componentes.

--------------------------------------------------
PALETA SEMÂNTICA
--------------------------------------------------

Ao invés de utilizar cores diretamente nos componentes, utilizamos
classes semânticas.

Exemplos:

- bg-base
- bg-surface
- bg-card
- bg-popup

- text-primary
- text-muted
- text-subtle

- border-base
- border-soft

Exemplo:

<div className="bg-card border-base">
  Conteúdo
</div>

Dessa forma, caso seja necessário alterar a identidade visual do
projeto, basta modificar o globals.css.

--------------------------------------------------
TEMA CLARO E ESCURO
--------------------------------------------------

Todas as classes semânticas possuem suporte para Light e Dark Mode.

Exemplo:

.text-primary {
  @apply text-zinc-900 dark:text-white;
}

Assim, componentes não precisam conhecer as cores específicas
de cada tema.

--------------------------------------------------
COMPONENTES GLOBAIS
--------------------------------------------------

Além da paleta, existem componentes visuais reutilizáveis.

Exemplos:

- app-header
- app-dropdown
- app-card
- app-input
- app-modal
- app-close-button

Exemplo:

<input className="app-input" />

Ao invés de repetir dezenas de classes Tailwind em cada página,
os componentes reutilizam esses estilos compartilhados.

--------------------------------------------------
SUPERFÍCIES E DESTAQUE VISUAL
--------------------------------------------------

Elementos que precisam de maior destaque utilizam:

- surface-elevated

Essa classe aplica:

- Fundo levemente elevado
- Borda destacada
- Sombra suave

Exemplo:

<div className="surface-elevated p-6 rounded-2xl">
  Conteúdo
</div>

Normalmente utilizada em:

- Cards grandes
- Formulários
- Containers principais
- Modais
- Seções de destaque

--------------------------------------------------
CRIANDO NOVOS COMPONENTES
--------------------------------------------------

Sempre que possível:

1. Utilizar as classes semânticas existentes.
2. Evitar cores fixas diretamente nos componentes.
3. Evitar repetição excessiva de classes Tailwind.
4. Criar novas classes globais apenas quando um padrão
   começar a se repetir em vários locais.

Exemplo:

.user-card {
  @apply
    bg-card
    border-base
    rounded-xl
    p-4
    shadow-sm;
}

--------------------------------------------------
BOAS PRÁTICAS
--------------------------------------------------

app = componentes presentes em todas as paginas, ex: header, inputs, forms e etc
tipo-proposito - maioria dos genericos
bg-base = background basico

ALGUNS PROBLEMAS COM CLASSES PODEM SER DEVIDO AO TAILWIND CSS DAR PRIORIDADE AS CLASSES DO MESMO

ex: text-base, sempre utiliza um tamnho fixo de texto, evite criar classes com esses tipos de nome


Começei a implementação de testes em algumas paginas/componentes


Em nosso sistema, o acesso é simples e direto: o usuário pode efetuar o login como em qualquer outra plataforma. Uma vez conectado, ele tem a liberdade de pesquisar vagas disponíveis de acordo com sua localização ou interesse, onde as propriedades cadastradas são exibidas com todas as informações relevantes, permitindo uma análise rápida das melhores opções.

Ao selecionar uma propriedade, o usuário consegue visualizar cada detalhe da vaga, incluindo a disponibilidade e as informações específicas inseridas pelo proprietário. E caso a oportunidade atenda às suas necessidades, o próximo passo é realizar a solicitação, dando início ao processo de reserva entre ambas as partes.

Após esse pedido, a reserva fica devidamente registrada no sistema, o que permite ao usuário acompanhar o status em tempo real. Tudo isso acontece dentro do painel do usuário, um espaço dedicado para gerenciar as reservas realizadas, conferir avisos importantes e acessar rapidamente os recursos que ele mais utiliza no dia a dia.

Mas a experiência não para por aí, pois o usuário também pode atuar como proprietário. Nessa modalidade, é possível gerenciar as propriedades cadastradas, acompanhar as solicitações recebidas e ter o controle total para aprovar ou recusar reservas conforme a disponibilidade.
A plataforma oferece um sistema de mensagens integrado, ideal para esclarecer dúvidas e alinhar detalhes. Além disso, o sistema conta com integração total a serviços de notificação, via Whatsapp, onde o usuário é notificado sobre a atividade de sua conta.

Para finalizar, o usuário consegue ajustar seus dados sempre que precisar, desde as informações do perfil até os detalhes dos seus veículos e propriedades cadastrados.

E a plataforma se adapta ao que você precisa no momento: você pode escolher entre ser apenas quem reserva as vagas com praticidade ou, passar a oferecer seus próprios espaços para outras pessoas como visto anteriormente.