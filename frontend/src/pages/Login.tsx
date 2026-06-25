import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { RespostaAutenticacao } from "../types";

export default function Login() {
  const navigate = useNavigate();

  const entrar = async (evento: FormEvent<HTMLFormElement>): Promise<void> => {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    try {
      const resposta = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dados.get("email"),
          senha: dados.get("senha"),
        }),
      });

      const data = (await resposta.json()) as RespostaAutenticacao;

      if (!resposta.ok) {
        alert(data.erro ?? "Erro ao fazer login");
        return;
      }

      localStorage.setItem("usuarioLogado", JSON.stringify(data));
      alert("Login realizado com sucesso!");
      navigate("/orcamento");
    } catch {
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <main className="page">
      <h1>Login</h1>
      <form className="form-card" onSubmit={entrar}>
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="senha" type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
