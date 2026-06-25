import { useState } from "react";
import type { ItemCarrinho } from "../types";
import { lerLocalStorage } from "../types";

type AlteracaoQuantidade = "mais" | "menos";

export default function Carrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>(() =>
    lerLocalStorage<ItemCarrinho[]>("carrinho", []),
  );
  const [finalizado, setFinalizado] = useState<boolean>(false);

  const atualizarCarrinho = (novoCarrinho: ItemCarrinho[]): void => {
    setItens(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const removerItem = (id: number): void => {
    atualizarCarrinho(itens.filter((item) => item.id !== id));
  };

  const alterarQuantidade = (id: number, tipo: AlteracaoQuantidade): void => {
    const novoCarrinho = itens.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantidade:
          tipo === "mais" ? item.quantidade + 1 : Math.max(1, item.quantidade - 1),
      };
    });

    atualizarCarrinho(novoCarrinho);
  };

  const subtotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const finalizarCompra = (): void => {
    localStorage.removeItem("carrinho");
    setItens([]);
    setFinalizado(true);
  };

  if (finalizado) {
    return (
      <main className="page">
        <div className="sucesso-compra">
          <h1>Compra finalizada com sucesso!</h1>
          <p>Seu pedido foi registrado. Em breve entraremos em contato.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page carrinho-page">
      <section>
        <h1>Meu Carrinho</h1>
        {itens.length === 0 ? (
          <div className="carrinho-vazio">
            <h2>Seu carrinho está vazio</h2>
            <p>Volte em Produtos ou Orçamento e adicione um produto.</p>
          </div>
        ) : (
          <div className="carrinho-lista">
            {itens.map((item) => (
              <div className="carrinho-item" key={item.id}>
                <div>
                  <h3>{item.nome}</h3>
                  <p>{item.quantidade} unidade(s)</p>
                </div>
                <div className="controle-quantidade">
                  <button type="button" onClick={() => alterarQuantidade(item.id, "menos")}>-</button>
                  <span>{item.quantidade}</span>
                  <button type="button" onClick={() => alterarQuantidade(item.id, "mais")}>+</button>
                </div>
                <strong>R$ {(item.preco * item.quantidade).toFixed(2)}</strong>
                <button type="button" className="btn-remover" onClick={() => removerItem(item.id)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className="resumo-carrinho">
        <h2>Resumo do Pedido</h2>
        <div className="linha-resumo"><span>Subtotal</span><strong>R$ {subtotal.toFixed(2)}</strong></div>
        <div className="linha-resumo"><span>Entrada 50%</span><strong>R$ {(subtotal / 2).toFixed(2)}</strong></div>
        <div className="linha-resumo"><span>Restante</span><strong>R$ {(subtotal / 2).toFixed(2)}</strong></div>
        <button type="button" onClick={finalizarCompra} disabled={itens.length === 0}>
          Finalizar Compra
        </button>
      </aside>
    </main>
  );
}
