// Tipos centrais do orçamento.
// Mantendo estes tipos em um arquivo separado, o projeto fica mais organizado
// e fácil de manter quando novos tecidos ou regras forem adicionados.
export type Tamanho = "PP" | "P" | "M" | "G" | "GG" | "XG" | "XXG";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  precoComDesconto: number;
}

export interface QuantidadesPorTamanho {
  PP: number;
  P: number;
  M: number;
  G: number;
  GG: number;
  XG: number;
  XXG: number;
}

export interface ResultadoOrcamento {
  quantidadeTotal: number;
  valorUnitarioAplicado: number;
  possuiDesconto: boolean;
  prazoProducao: string;
  valorTotalBruto: number;
  valorEntrada: number;
  valorRestante: number;
}
