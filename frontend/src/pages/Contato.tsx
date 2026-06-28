export default function Contato() {
  return (
    <main className="page">
      <section className="page-hero">
        <span className="eyebrow">Atendimento</span>
        <h1>Fale com a ReVest</h1>
        <p>Entre em contato para tirar dúvidas sobre tecidos, arte, prazo e formas de entrega.</p>
      </section>

      <section className="contact-grid">
        <article className="feature-card">
          <h2>WhatsApp</h2>
          <p>(92) 99148-9340</p>
        </article>
        <article className="feature-card">
          <h2>Horário</h2>
          <p>Segunda a sexta, das 08h às 17h.</p>
        </article>
        <article className="feature-card">
          <h2>Entregas</h2>
          <p>Retirada, Uber Entrega ou entrega própria entre 18h e 21h, conforme rota disponível.</p>
        </article>
      </section>
    </main>
  );
}
