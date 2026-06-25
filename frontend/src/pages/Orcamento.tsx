import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ItemCarrinho, Usuario } from "../types";
import { lerLocalStorage } from "../types";

interface ProdutoOrcamento {
  nome: string;
  preco: number;
  atacado: number;
}

const produtos: ProdutoOrcamento[] = [
  { nome: "Tecido Frio (Dry Fit)", preco: 42, atacado: 30 },
  { nome: "AeroDry", preco: 45, atacado: 37 },
  { nome: "Elanca Lite", preco: 38, atacado: 27 },
];

export default function Orcamento() {
  const navigate = useNavigate();
  const usuario = lerLocalStorage<Usuario | null>("usuarioLogado", null);

  if (!usuario) {
    return (
      <main className="page">
        <h1>Acesso restrito</h1>
        <p>Você precisa fazer login ou cadastro para solicitar orçamento.</p>
        <div className="botoes">
          <Link to="/login"><button type="button">Fazer Login</button></Link>
          <Link to="/cadastro"><button type="button" className="btn-secundario">Criar Cadastro</button></Link>
        </div>
      </main>
    );
  }

  const enviarParaCarrinho = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const produtoNome = String(dados.get("produto") ?? "");
    const quantidade = Number(dados.get("quantidade"));
    const produto = produtos.find((produtoAtual) => produtoAtual.nome === produtoNome);

    if (!produto || quantidade < 1) {
      alert("Selecione um produto e uma quantidade válida.");
      return;
    }

    const item: ItemCarrinho = {
      id: Date.now(),
      nome: produtoNome,
      quantidade,
      preco: quantidade >= 6 ? produto.atacado : produto.preco,
      cliente: String(dados.get("nome") ?? ""),
      telefone: String(dados.get("telefone") ?? ""),
      cidade: String(dados.get("cidade") ?? ""),
      tamanho: String(dados.get("tamanho") ?? ""),
      cor: String(dados.get("cor") ?? ""),
      observacao: String(dados.get("observacao") ?? ""),
    };

    const carrinhoAtual = lerLocalStorage<ItemCarrinho[]>("carrinho", []);
    localStorage.setItem("carrinho", JSON.stringify([...carrinhoAtual, item]));
    alert("Orçamento adicionado ao carrinho!");
    navigate("/carrinho");
  };

  return (
    <main className="page">
      <h1>Solicite seu Orçamento</h1>
      <p>Preencha os dados abaixo para calcular e enviar ao carrinho.</p>
      <form className="form-card" onSubmit={enviarParaCarrinho}>
        <input name="nome" placeholder="Nome completo" required />
        <input name="telefone" placeholder="Telefone / WhatsApp" required />
        <input name="cidade" placeholder="Cidade" required />
        <select name="produto" required>
          <option value="">Selecione o produto</option>
          {produtos.map((produto) => <option key={produto.nome} value={produto.nome}>{produto.nome}</option>)}
        </select>
        <input name="quantidade" type="number" min="1" placeholder="Quantidade" required />
        <input name="tamanho" placeholder="Tamanho. Ex: P, M, G, GG" />
        <input name="cor" placeholder="Cor desejada" />
        <input name="arte" type="file" />
        <textarea name="observacao" placeholder="Descreva detalhes da arte, modelo ou prazo desejado" />
        <button type="submit">Adicionar ao Carrinho</button>
      </form>

      <div className="observacao">
        <h2>Formas de Pagamento</h2>
        <ul>
          <li>50% de entrada para iniciar a produção</li>
          <li>50% na retirada ou entrega</li>
          <li>Cartão de crédito à vista em 1x sem juros</li>
          <li>Parcelamentos acima de 1x com juros da maquininha</li>
          <li>Pix para o CNPJ da empresa</li>
          <li>Dinheiro somente na loja física</li>
          <li>Não recebemos pagamento em dinheiro por entregador</li>
        </ul>
      </div>
    </main>
  );
}
