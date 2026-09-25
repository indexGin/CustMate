/**
 * O DESENHO da marca do produto — símbolo e logotipo — como geometria pura.
 *
 * Mora aqui, e não num `.svg` em `public/`, por duas razões que a doutrina de
 * marca própria já paga:
 *
 *  1. `public/` é servido a todo mundo, sempre. Um arquivo fixo ali seria a
 *     marca do PRODUTO na instalação de um revendedor que configurou a dele —
 *     é exatamente o vazamento que `tests/unit/branding.test.ts` vigia. Como
 *     geometria, o desenho só aparece onde um componente decide que a marca em
 *     vigor é a padrão (`marcaEhADoProduto`, em `lib/branding.ts`).
 *  2. O favicon (`app/icon.tsx`) é gerado em runtime pelo `ImageResponse`, que
 *     aceita SVG inline mas não lê arquivo do disco. Um único desenho alimenta
 *     a tela e o ícone — dois arquivos divergiriam na primeira revisão da marca.
 *
 * As cores NÃO estão aqui de propósito: quem desenha escolhe (a tela lê os
 * tokens do tema; o favicon lê a régua do produto). A fonte deste arquivo são
 * os SVGs em `docs/brand/`; ao trocar a arte, regenere os dois lados a partir
 * deles.
 *
 * ── A ideia do símbolo ───────────────────────────────────────────────────────
 *
 * Um "C" aberto abraçando um nó: o cliente (o nó) dentro do cuidado (o C). A
 * abertura fica à direita e o nó mora nela — a leitura é "conversa em curso",
 * e o desenho continua legível a 16 px porque são só duas massas: um anel
 * grosso e um ponto. Evitamos traços finos de propósito: em favicon e na barra
 * recolhida eles somem.
 */

/** O símbolo: um "C" (anel aberto à direita) com um nó no vão. Quadrado de 216. */
export const SIMBOLO = {
  viewBox: "0 0 216 216",
  transform: "translate(0 0)",
  // Anel preenchido: arco externo (R=88) de 52° a 308°, parede interna (r=52) de volta.
  d: "M162.18 177.34A88 88 0 1 1 162.18 38.66L140.01 67.02A52 52 0 1 0 140.01 148.98Z",
  // O nó: quadrado de 36 com raio 18 = círculo, no centro do vão (178,108).
  modulo: { x: 160, y: 90, width: 36, height: 36, rx: 18 },
} as const;

/**
 * O logotipo: símbolo + nome CustMate. O componente renderiza o nome em SVG
 * (dois trechos de texto, "Cust" e "Mate", para que o nome nunca vire um nó de
 * texto plano no DOM — `tests/unit/marca-do-produto.test.tsx` depende disso).
 */
export const LOGOTIPO = {
  viewBox: "0 0 600 230",
  /** Proporção largura/altura do `viewBox`, para dimensionar por altura. */
  proporcao: 600 / 230,
  simbolo: { transform: "translate(18 26) scale(0.85)", d: SIMBOLO.d, modulo: SIMBOLO.modulo },
} as const;

/**
 * As cores da marca do produto, por tema.
 *
 * O produto usa uma linha de tinta neutra na interface (acento acromático,
 * vigiado por `branding-contraste.test.ts`) e expressa a MARCA na cor do
 * símbolo: um teal profundo no claro e um menta claro no escuro. O nome fica
 * quase-preto/quase-branco; o subtítulo, num cinza de apoio.
 */
export const CORES_DA_MARCA = {
  claro: { simbolo: "#0f766e", nome: "#141118", sufixo: "#6b7280" },
  escuro: { simbolo: "#5eead4", nome: "#f5f3ff", sufixo: "#9ca3af" },
} as const;
