import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-profissional">
      <section className="hero">
        <div>
          <span className="tag">Gráfica online personalizada</span>
          <h1>ReVest</h1>
          <p>Produtos personalizados com qualidade profissional para empresas, eventos, uniformes, brindes e materiais promocionais.</p>
          <div className="botoes">
            <Link to="/orcamento"><button type="button">Solicitar Orçamento</button></Link>
            <Link to="/produtos"><button type="button" className="btn-secundario">Ver Produtos</button></Link>
          </div>
        </div>
        <div className="hero-card">
          <h2>Promoção Especial</h2>
          <p>Desconto automático a partir de 6 unidades.</p>
          <div className="preco-destaque"><span>A partir de </span><strong>R$ 27,00</strong></div>
        </div>
      </section>
      <section className="beneficios">
        <div><h3>Entrega combinada</h3><p>Retirada na loja ou entrega conforme negociação.</p></div>
        <div><h3>Pagamento facilitado</h3><p>50% de entrada e 50% na retirada ou entrega.</p></div>
        <div><h3>Arte personalizada</h3><p>Envie sua ideia pelo formulário de orçamento.</p></div>
      </section>
    </main>
  );
}
