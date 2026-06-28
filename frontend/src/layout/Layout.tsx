import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const links = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Tecidos" },
  { to: "/orcamento", label: "Orçamento" },
  { to: "/contato", label: "Contato" },
];

export default function Layout({ children }: LayoutProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  const classeDoLink = ({ isActive }: { isActive: boolean }): string =>
    isActive ? "nav-link ativo" : "nav-link";

  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="brand" onClick={() => setMenuAberto(false)}>
          <span className="brand-mark">R</span>
          <span>
            <strong>ReVest</strong>
            <small>Estamparia personalizada</small>
          </span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Menu principal">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={classeDoLink}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/orcamento" className="header-cta">
          Fazer orçamento
        </NavLink>

        <button
          type="button"
          className="menu-button"
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuAberto && (
        <button
          type="button"
          className="overlay"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside className={`mobile-menu ${menuAberto ? "aberto" : ""}`}>
        <div className="mobile-menu-head">
          <strong>ReVest</strong>
          <button type="button" aria-label="Fechar menu" onClick={() => setMenuAberto(false)}>
            ×
          </button>
        </div>

        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={classeDoLink} onClick={() => setMenuAberto(false)}>
            {link.label}
          </NavLink>
        ))}
      </aside>

      <div className="site-content">{children}</div>

      <footer className="site-footer">
        <div>
          <strong>ReVest</strong>
          <p>Uniformes, eventos, brindes e peças personalizadas sob orçamento.</p>
        </div>
        <div>
          <span>Pagamento: 50% entrada + 50% na retirada/entrega</span>
          <span>Produção: 3 a 7 dias úteis</span>
        </div>
      </footer>
    </>
  );
}
