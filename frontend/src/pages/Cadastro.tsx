import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { RespostaAutenticacao } from "../types";

export default function Cadastro() {
  const navigate = useNavigate();

  const cadastrar = async (evento: FormEvent<HTMLFormElement>): Promise<void> => {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    try {
      const resposta = await fetch("http://localhost:5000/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: dados.get("nome"),
          email: dados.get("email"),
          senha: dados.get("senha"),
        }),
      });

      const data = (await resposta.json()) as RespostaAutenticacao;

      if (!resposta.ok) {
        alert(data.erro ?? "Erro ao cadastrar");
        return;
      }

      localStorage.setItem("usuarioLogado", JSON.stringify(data));
      alert("Cadastro realizado com sucesso!");
      navigate("/orcamento");
    } catch {
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <main className="page">
      <h1>Cadastro</h1>
      <form className="form-card" onSubmit={cadastrar}>
        <input name="nome" placeholder="Nome completo" required />
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="senha" type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
