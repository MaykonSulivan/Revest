import { Link, useNavigate } from "react-router-dom";
import type { Usuario } from "../types";
import { lerLocalStorage } from "../types";

export default function Painel() {
  const navigate = useNavigate();
  const usuario = lerLocalStorage<Usuario | null>("usuarioLogado", null);

  if (!usuario) {
    return (
      <main className="page">
        <h1>Acesso restrito</h1>
        <p>Faça login para acessar sua conta.</p>
        <Link to="/login"><button type="button">Entrar</button></Link>
      </main>
    );
  }

  const sair = (): void => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <main className="page">
      <h1>Minha Conta</h1>
      <div className="perfil-card">
        <h2>Dados do Usuário</h2>
        <p><strong>ID:</strong> {usuario.codigo}</p>
        <p><strong>Nome:</strong> {usuario.name}</p>
        <p><strong>E-mail:</strong> {usuario.email}</p>
        <p>
          <strong>Último login:</strong>{" "}
          {usuario.ultimoLogin
            ? new Date(usuario.ultimoLogin).toLocaleString("pt-BR")
            : "Primeiro acesso"}
        </p>
        <button type="button" className="btn-sair" onClick={sair}>Sair da Conta</button>
      </div>
    </main>
  );
}
