import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

interface Usuario {
  name: string;
  email: string;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const [contaAberta, setContaAberta] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo) as Usuario;
    } catch {
      localStorage.removeItem("usuarioLogado");
      return null;
    }
  });

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  const fecharTudo = (): void => {
    setMenuAberto(false);
    setContaAberta(false);
  };

  const sair = (): void => {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
    fecharTudo();
    void navigate("/");
  };

  const classeDoLink = ({
    isActive,
  }: {
    isActive: boolean;
  }): string => {
    return isActive ? "rv-link ativo" : "rv-link";
  };

  return (
    <>
      <header className="rv-header">
        {/* Logo */}
        <NavLink to="/" className="rv-logo" onClick={fecharTudo}>
          <span className="rv-logo-icone">R</span>
          <span className="rv-logo-texto">ReVest</span>
        </NavLink>

        {/* Menu central para computador */}
        <nav className="rv-menu-desktop">
          <NavLink to="/" className={classeDoLink}>
            Início
          </NavLink>

          <NavLink to="/produtos" className={classeDoLink}>
            Produtos
          </NavLink>

          <NavLink to="/orcamento" className={classeDoLink}>
            Orçamento
          </NavLink>

          <NavLink to="/contato" className={classeDoLink}>
            Contato
          </NavLink>
        </nav>

        {/* Botões da direita */}
        <div className="rv-acoes">
          {/* Botão da conta */}
          <div className="rv-conta-area">
            <button
              type="button"
              className="rv-botao-conta"
              aria-label="Abrir opções da conta"
              onClick={() => {
                setContaAberta((estado) => !estado);
                setMenuAberto(false);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.8-4.2 3.4-6.3 8-6.3s7.2 2.1 8 6.3" />
              </svg>

              <span>
                {usuario?.name || "Conta"}
              </span>
            </button>

            {contaAberta && (
              <div className="rv-conta-dropdown">
                {usuario ? (
                  <>
                    <div className="rv-usuario">
                      <div className="rv-avatar">
                        {usuario.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="rv-usuario-dados">
                        <strong>{usuario.name}</strong>
                        <small>{usuario.email}</small>
                      </div>
                    </div>

                    <NavLink to="/painel" onClick={fecharTudo}>
                      Minha conta
                    </NavLink>

                    <NavLink to="/orcamento" onClick={fecharTudo}>
                      Meus orçamentos
                    </NavLink>

                    <button
                      type="button"
                      className="rv-sair"
                      onClick={sair}
                    >
                      Sair da conta
                    </button>
                  </>
                ) : (
                  <>
                    <p>Entre para acompanhar seus pedidos.</p>

                    <NavLink
                      to="/login"
                      className="rv-entrar"
                      onClick={fecharTudo}
                    >
                      Entrar
                    </NavLink>

                    <NavLink
                      to="/cadastro"
                      className="rv-cadastrar"
                      onClick={fecharTudo}
                    >
                      Criar conta
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Três barras */}
          <button
            type="button"
            className="rv-hamburguer"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => {
              setMenuAberto(true);
              setContaAberta(false);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Fundo do menu */}
      {menuAberto && (
        <button
          type="button"
          className="rv-overlay"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral */}
      <aside className={`rv-menu-lateral ${menuAberto ? "aberto" : ""}`}>
        <div className="rv-menu-topo">
          <div>
            <span>MENU PRINCIPAL</span>
            <h2>ReVest</h2>
          </div>

          <button
            type="button"
            className="rv-fechar"
            aria-label="Fechar menu"
            onClick={() => setMenuAberto(false)}
          >
            ×
          </button>
        </div>

        <nav className="rv-menu-links">
          <NavLink to="/" className={classeDoLink} onClick={fecharTudo}>
            <svg viewBox="0 0 24 24">
              <path d="M3 11 12 3l9 8" />
              <path d="M5 10v11h14V10" />
              <path d="M9 21v-7h6v7" />
            </svg>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/produtos"
            className={classeDoLink}
            onClick={fecharTudo}
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 7h16v14H4z" />
              <path d="M8 7a4 4 0 0 1 8 0" />
            </svg>
            <span>Produtos</span>
          </NavLink>

          <NavLink
            to="/orcamento"
            className={classeDoLink}
            onClick={fecharTudo}
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 3h12v18H6z" />
              <path d="M9 7h6M9 11h6M9 15h3" />
            </svg>
            <span>Orçamento</span>
          </NavLink>

          <NavLink
            to="/painel"
            className={classeDoLink}
            onClick={fecharTudo}
          >
            <svg viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <span>Painel</span>
          </NavLink>

          <NavLink
            to="/contato"
            className={classeDoLink}
            onClick={fecharTudo}
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 5h18v14H3z" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            <span>Contato</span>
          </NavLink>

          <NavLink
            to={usuario ? "/painel" : "/login"}
            className={classeDoLink}
            onClick={fecharTudo}
          >
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c.8-4.2 3.4-6.3 8-6.3s7.2 2.1 8 6.3" />
            </svg>
            <span>Conta</span>
          </NavLink>
        </nav>

        <div className="rv-menu-rodape">
          <span>ReVest</span>
          <small>Produtos personalizados</small>
        </div>
      </aside>

      <div className="rv-conteudo">
        {children}
      </div>
    </>
  );
}