import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import "./style.css";

import Layout from "./layout/Layout";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orcamento from "./pages/Orcamento";
import Painel from "./pages/Painel";
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
          <Route path="/painel" element={<Painel />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/carrinho" element={<Carrinho />} />

          {/* Rota para página inexistente */}
          <Route
            path="*"
            element={
              <main className="page">
                <h1>Página não encontrada</h1>
                <p>A página que você tentou acessar não existe.</p>
              </main>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);