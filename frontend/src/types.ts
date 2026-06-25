export interface Usuario {
  id?: number;
  codigo?: string;
  name: string;
  email: string;
  ultimoLogin?: string;
}

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  cliente?: string;
  telefone?: string;
  cidade?: string;
  tamanho?: string;
  cor?: string;
  observacao?: string;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  precoAtacado: number;
}

export interface Pedido {
  id: number;
  codigo: string;
  productName: string;
  quantity: number;
  total: number;
}

export interface RespostaAutenticacao extends Usuario {
  token?: string;
  erro?: string;
}

export function lerLocalStorage<T>(chave: string, padrao: T): T {
  const valor = localStorage.getItem(chave);

  if (!valor) return padrao;

  try {
    return JSON.parse(valor) as T;
  } catch {
    return padrao;
  }
}
