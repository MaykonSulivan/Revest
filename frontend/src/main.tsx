import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.css";
import Layout from "./layout/Layout";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import Orcamento from "./pages/Orcamento";
import Produtos from "./pages/Produtos";

const elementoRoot = document.getElementById("root");

if (!elementoRoot) {
  throw new Error("Elemento root não encontrado.");
}

ReactDOM.createRoot(elementoRoot).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/contato" element={<Contato />} />

          {/* Rotas de login, cadastro, painel e carrinho foram removidas.
              Agora o fluxo profissional é direto: cliente calcula orçamento e envia no WhatsApp. */}
          <Route
            path="*"
            element={
              <main className="page page-centered">
                <span className="eyebrow">404</span>
                <h1>Página não encontrada</h1>
                <p>A página que você tentou acessar não existe.</p>
              </main>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);
