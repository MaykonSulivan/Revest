import { Link } from "react-router-dom";
import { produtos } from "../data/orcamento";

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Orçamento rápido pelo WhatsApp</span>
          <h1>Estamparia profissional para sua marca, equipe ou evento.</h1>
          <p>
            Escolha o tecido, informe as quantidades por tamanho e receba o valor bruto,
            prazo de produção e condições de pagamento automaticamente.
          </p>
          <div className="actions">
            <Link to="/orcamento" className="btn primary">Solicitar orçamento</Link>
            <Link to="/produtos" className="btn secondary">Ver tecidos</Link>
          </div>
        </div>

        <div className="hero-card">
          <span>Desconto automático</span>
          <strong>A partir de 6 unidades</strong>
          <p>O sistema troca o preço unitário automaticamente quando o pedido atinge a quantidade mínima.</p>
        </div>
      </section>

      <section className="section-grid three-columns">
        <article className="feature-card">
          <h2>Pagamento claro</h2>
          <p>50% de entrada para iniciar a produção e 50% na retirada ou entrega.</p>
        </article>
        <article className="feature-card">
          <h2>Entrega combinada</h2>
          <p>Retirada, Uber Entrega por conta do cliente ou entrega própria conforme rota.</p>
        </article>
        <article className="feature-card">
          <h2>Prazo estimado</h2>
          <p>Até 5 unidades em 3 dias úteis. A partir de 6 unidades em 7 dias úteis.</p>
        </article>
      </section>

      <section className="section-block">
        <div>
          <span className="eyebrow">Tecidos disponíveis</span>
          <h2>Opções para diferentes necessidades</h2>
        </div>
        <div className="product-strip">
          {produtos.map((produto) => (
            <article key={produto.id}>
              <strong>{produto.nome}</strong>
              <span>Até 5 un.: R$ {produto.precoUnitario.toFixed(2)}</span>
              <span>6+ un.: R$ {produto.precoComDesconto.toFixed(2)}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
