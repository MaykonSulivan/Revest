import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Pedido, Usuario } from "../types";
import { lerLocalStorage } from "../types";

export default function Conta() {
  const usuario = lerLocalStorage<Usuario | null>("usuarioLogado", null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    if (usuario?.email !== "admin@revest.com") return;

    const carregarDados = async (): Promise<void> => {
      try {
        const [respostaUsuarios, respostaPedidos] = await Promise.all([
          fetch("http://localhost:5000/api/usuarios"),
          fetch("http://localhost:5000/api/pedidos"),
        ]);

        if (!respostaUsuarios.ok || !respostaPedidos.ok) {
          throw new Error("Erro ao carregar os dados administrativos.");
        }

        setUsuarios((await respostaUsuarios.json()) as Usuario[]);
        setPedidos((await respostaPedidos.json()) as Pedido[]);
      } catch {
        alert("Não foi possível carregar os dados administrativos.");
      }
    };

    void carregarDados();
  }, [usuario?.email]);

  if (usuario?.email !== "admin@revest.com") {
    return (
      <main className="page">
        <h1>Acesso negado</h1>
        <p>Somente o administrador pode acessar esta página.</p>
        <Link to="/painel"><button type="button">Ir para minha conta</button></Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Admin</h1>
      <h2>Usuários cadastrados</h2>
      <section className="admin-grid">
        {usuarios.map((usuarioCadastrado) => (
          <div className="admin-card" key={usuarioCadastrado.id ?? usuarioCadastrado.email}>
            <strong>{usuarioCadastrado.codigo}</strong>
            <p>{usuarioCadastrado.name}</p>
            <p>{usuarioCadastrado.email}</p>
          </div>
        ))}
      </section>

      <h2>Pedidos / Orçamentos</h2>
      <section className="admin-grid">
        {pedidos.map((pedido) => (
          <div className="admin-card" key={pedido.id}>
            <strong>{pedido.codigo}</strong>
            <p>{pedido.productName}</p>
            <p>Quantidade: {pedido.quantity}</p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
