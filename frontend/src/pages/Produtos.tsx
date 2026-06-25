import { useNavigate } from "react-router-dom";
import type { ItemCarrinho, Produto } from "../types";
import { lerLocalStorage } from "../types";

const produtos: Produto[] = [
  { id: 1, nome: "Tecido Frio (Dry Fit)", preco: 42, precoAtacado: 30 },
  { id: 2, nome: "AeroDry", preco: 45, precoAtacado: 37 },
  { id: 3, nome: "Elanca Lite", preco: 38, precoAtacado: 27 },
];

export default function Produtos() {
  const navigate = useNavigate();

  const adicionarCarrinho = (produto: Produto): void => {
    const carrinho = lerLocalStorage<ItemCarrinho[]>("carrinho", []);
    const item: ItemCarrinho = {
      id: carrinho.reduce((maiorId, itemAtual) => Math.max(maiorId, itemAtual.id), 0) + 1,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
    };

    localStorage.setItem("carrinho", JSON.stringify([...carrinho, item]));
    alert("Produto adicionado ao carrinho!");
    navigate("/carrinho");
  };

  return (
    <main className="page">
      <h1>Produtos</h1>
      <section className="produtos-grid">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <h2>{produto.nome}</h2>
            <p>Até 5 unidades</p>
            <h3>R$ {produto.preco.toFixed(2)}</h3>
            <p>A partir de 6 unidades</p>
            <h3>R$ {produto.precoAtacado.toFixed(2)}</h3>
            <button type="button" onClick={() => adicionarCarrinho(produto)}>
              Solicitar Orçamento
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
