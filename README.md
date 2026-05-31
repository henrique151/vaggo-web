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