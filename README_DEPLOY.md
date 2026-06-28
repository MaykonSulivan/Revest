# ReVest - projeto organizado para deploy

## O que foi alterado

- Removidas as rotas de login, cadastro, painel e carrinho do frontend.
- Removido o uso obrigatório de banco de dados e Prisma no backend para evitar erro de `DATABASE_URL` no Render.
- O fluxo principal agora é profissional e direto: o cliente monta o orçamento e é direcionado para o WhatsApp com todos os valores calculados.
- Organizadas as regras de orçamento em `frontend/src/data/orcamento.ts`.
- Comentários adicionados nos pontos principais para facilitar manutenção.
- Frontend preparado para Vercel.
- Backend simples preparado para Render, com rota de teste e rota de regras do orçamento.

## Regras implementadas

- Tecidos:
  - Tecido Frio (Dry Fit): R$ 42,00 até 5 unidades / R$ 30,00 a partir de 6 unidades.
  - AeroDry: R$ 45,00 até 5 unidades / R$ 37,00 a partir de 6 unidades.
  - Elanca Lite: R$ 38,00 até 5 unidades / R$ 27,00 a partir de 6 unidades.
- Tamanhos: PP, P, M, G, GG, XG e XXG.
- Prazo:
  - Até 5 unidades: 3 dias úteis.
  - A partir de 6 unidades: 7 dias úteis.
- Pagamento:
  - 50% de entrada para iniciar a produção.
  - 50% na retirada ou entrega.
  - Cartão de crédito 1x sem juros.
  - Parcelamento acima de 1x com juros da maquininha.
  - Pix para o CNPJ.
  - Dinheiro somente na loja física.
  - Não recebe dinheiro por entregador.
- Entrega:
  - Retirada na loja.
  - Uber Entrega por conta do cliente.
  - Entrega própria das 18h às 21h conforme rota.

## Como alterar o WhatsApp

Abra:

```txt
frontend/src/data/orcamento.ts
```

Troque:

```ts
export const WHATSAPP_EMPRESA = "5592991489340";
```

Use sempre o formato: `55 + DDD + número`, sem espaços e sem traços.

## Deploy do frontend na Vercel

- Root Directory: `frontend`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Deploy do backend no Render

- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

O backend não precisa de `DATABASE_URL` nesta versão.
