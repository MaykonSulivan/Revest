import { Link } from "react-router-dom";
import { formatarMoeda, produtos } from "../data/orcamento";

export default function Produtos() {
  return (
    <main className="page">
      <section className="page-hero">
        <span className="eyebrow">Tabela de tecidos</span>
        <h1>Escolha o tecido ideal para seu orçamento</h1>
        <p>
          Cada tecido possui preço normal para até 5 unidades e preço com desconto a partir de 6 unidades.
        </p>
      </section>

      <section className="products-grid">
        {produtos.map((produto) => (
          <article key={produto.id} className="product-card">
            <div>
              <span className="product-badge">Tecido</span>
              <h2>{produto.nome}</h2>
              <p>{produto.descricao}</p>
            </div>

            <div className="price-list">
              <div>
                <span>Até 5 unidades</span>
                <strong>{formatarMoeda(produto.precoUnitario)}</strong>
              </div>
              <div>
                <span>A partir de 6 unidades</span>
                <strong>{formatarMoeda(produto.precoComDesconto)}</strong>
              </div>
            </div>

            <Link to="/orcamento" className="btn primary full">Calcular orçamento</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
