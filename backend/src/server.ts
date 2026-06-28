import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Backend simplificado para deploy profissional.
// Login, cadastro e Prisma foram removidos porque o fluxo atual do site
// envia o orçamento direto para o WhatsApp da empresa.
app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "online",
    projeto: "ReVest API",
    mensagem: "Backend funcionando. O orçamento principal é enviado pelo WhatsApp.",
  });
});

app.get("/api/regras-orcamento", (_req: Request, res: Response) => {
  res.json({
    tecidos: [
      { nome: "Tecido Frio (Dry Fit)", precoUnitario: 42, precoComDesconto: 30 },
      { nome: "AeroDry", precoUnitario: 45, precoComDesconto: 37 },
      { nome: "Elanca Lite", precoUnitario: 38, precoComDesconto: 27 },
    ],
    tamanhos: ["PP", "P", "M", "G", "GG", "XG", "XXG"],
    desconto: "A partir de 6 unidades",
    prazos: {
      ate5Unidades: "3 dias úteis",
      aPartirDe6Unidades: "7 dias úteis",
    },
    pagamento: [
      "50% de entrada para iniciar a produção",
      "50% na retirada ou entrega",
      "Cartão de crédito à vista (1x) sem juros",
      "Parcelamentos acima de 1x com juros da maquininha",
      "Pix para o CNPJ da empresa",
      "Dinheiro em espécie somente na loja física",
      "Não recebemos pagamento em dinheiro por entregador",
    ],
    entrega: [
      "Retirada na loja",
      "Uber Entrega por conta do cliente",
      "Entrega própria da empresa entre 18h e 21h, conforme disponibilidade da rota",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ReVest rodando na porta ${PORT}`);
});
