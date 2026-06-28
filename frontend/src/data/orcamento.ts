import type { Produto, QuantidadesPorTamanho, ResultadoOrcamento, Tamanho } from "../types";

// Número que receberá os orçamentos pelo WhatsApp.
// Troque somente este valor se o número da empresa mudar.
// Formato: código do país + DDD + número, sem espaços, traços ou parênteses.
export const WHATSAPP_EMPRESA = "5592995191740";

export const tamanhos: Tamanho[] = ["PP", "P", "M", "G", "GG", "XG", "XXG"];

// Tabela de tecidos e preços.
// Regra: até 5 unidades usa preço normal; a partir de 6 unidades aplica preço com desconto.
export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Tecido Frio (Dry Fit)",
    descricao: "Malha leve, confortável e indicada para uniformes, eventos e uso diário.",
    precoUnitario: 42,
    precoComDesconto: 30,
  },
  {
    id: 2,
    nome: "AeroDry",
    descricao: "Tecido premium com toque macio, excelente caimento e secagem rápida.",
    precoUnitario: 45,
    precoComDesconto: 37,
  },
  {
    id: 3,
    nome: "Elanca Lite",
    descricao: "Opção econômica, flexível e resistente para grandes quantidades.",
    precoUnitario: 38,
    precoComDesconto: 27,
  },
];

export const quantidadesIniciais: QuantidadesPorTamanho = {
  PP: 0,
  P: 0,
  M: 0,
  G: 0,
  GG: 0,
  XG: 0,
  XXG: 0,
};

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calcularQuantidadeTotal(quantidades: QuantidadesPorTamanho): number {
  return Object.values(quantidades).reduce((total, quantidade) => total + quantidade, 0);
}

export function calcularOrcamento(
  produto: Produto | undefined,
  quantidades: QuantidadesPorTamanho,
): ResultadoOrcamento {
  const quantidadeTotal = calcularQuantidadeTotal(quantidades);
  const possuiDesconto = quantidadeTotal >= 6;
  const valorUnitarioAplicado = produto
    ? possuiDesconto
      ? produto.precoComDesconto
      : produto.precoUnitario
    : 0;
  const valorTotalBruto = quantidadeTotal * valorUnitarioAplicado;

  return {
    quantidadeTotal,
    valorUnitarioAplicado,
    possuiDesconto,
    prazoProducao: quantidadeTotal >= 6 ? "7 dias úteis" : "3 dias úteis",
    valorTotalBruto,
    valorEntrada: valorTotalBruto / 2,
    valorRestante: valorTotalBruto / 2,
  };
}
