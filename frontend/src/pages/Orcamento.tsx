import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  WHATSAPP_EMPRESA,
  calcularOrcamento,
  formatarMoeda,
  produtos,
  quantidadesIniciais,
  tamanhos,
} from "../data/orcamento";
import type { Produto, QuantidadesPorTamanho, Tamanho } from "../types";

export default function Orcamento() {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>(produtos[0]);
  const [quantidades, setQuantidades] = useState<QuantidadesPorTamanho>(quantidadesIniciais);
  const resultado = useMemo(
    () => calcularOrcamento(produtoSelecionado, quantidades),
    [produtoSelecionado, quantidades],
  );

  function alterarQuantidade(tamanho: Tamanho, valor: string): void {
    const quantidade = Math.max(0, Number(valor) || 0);
    setQuantidades((estadoAtual) => ({
      ...estadoAtual,
      [tamanho]: quantidade,
    }));
  }

  function montarResumoTamanhos(): string {
    const linhas = tamanhos
      .filter((tamanho) => quantidades[tamanho] > 0)
      .map((tamanho) => `${tamanho}: ${quantidades[tamanho]} unidade(s)`);

    return linhas.length > 0 ? linhas.join("\n") : "Nenhum tamanho informado";
  }

  function enviarWhatsapp(evento: FormEvent<HTMLFormElement>): void {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    if (!produtoSelecionado || resultado.quantidadeTotal <= 0) {
      alert("Escolha um tecido e informe pelo menos 1 unidade em algum tamanho.");
      return;
    }

    const nome = String(dados.get("nome") || "Não informado");
    const telefone = String(dados.get("telefone") || "Não informado");
    const cidade = String(dados.get("cidade") || "Não informada");
    const entrega = String(dados.get("entrega") || "Não informada");
    const cor = String(dados.get("cor") || "Não informada");
    const observacao = String(dados.get("observacao") || "Sem observações");

    // Mensagem profissional enviada para o WhatsApp da empresa.
    // Ela leva todos os valores calculados para agilizar o atendimento e o pagamento.
    const mensagem = [
      "Olá! Quero finalizar um orçamento da ReVest.",
      "",
      "*DADOS DO CLIENTE*",
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `Cidade: ${cidade}`,
      "",
      "*ORÇAMENTO*",
      `Tecido: ${produtoSelecionado.nome}`,
      `Cor desejada: ${cor}`,
      "Tamanhos:",
      montarResumoTamanhos(),
      `Quantidade total: ${resultado.quantidadeTotal} unidade(s)`,
      `Preço unitário aplicado: ${formatarMoeda(resultado.valorUnitarioAplicado)}`,
      `Desconto aplicado: ${resultado.possuiDesconto ? "Sim, pedido a partir de 6 unidades" : "Não, pedido até 5 unidades"}`,
      `Prazo estimado: ${resultado.prazoProducao}`,
      `Valor final bruto: ${formatarMoeda(resultado.valorTotalBruto)}`,
      `Entrada 50%: ${formatarMoeda(resultado.valorEntrada)}`,
      `Restante 50%: ${formatarMoeda(resultado.valorRestante)}`,
      "",
      "*ENTREGA*",
      entrega,
      "",
      "*FORMA DE PAGAMENTO*",
      "50% de entrada para iniciar a produção e 50% na retirada ou entrega.",
      "Pix para CNPJ, cartão 1x sem juros ou parcelado com juros da maquininha.",
      "Dinheiro em espécie somente na loja física. Não recebemos dinheiro por entregador.",
      "",
      "*OBSERVAÇÕES*",
      observacao,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="page quote-page">
      <section className="page-hero">
        <span className="eyebrow">Orçamento automático</span>
        <h1>Monte seu orçamento e envie direto para o WhatsApp</h1>
        <p>
          Informe o tecido, a quantidade por tamanho e confira o valor final bruto,
          entrada, restante e prazo antes de enviar.
        </p>
      </section>

      <section className="quote-layout">
        <form className="quote-form" onSubmit={enviarWhatsapp}>
          <div className="form-section">
            <h2>1. Dados do cliente</h2>
            <div className="form-grid two">
              <label>
                Nome completo
                <input name="nome" placeholder="Digite seu nome" required />
              </label>
              <label>
                WhatsApp
                <input name="telefone" placeholder="(00) 00000-0000" required />
              </label>
              <label>
                Cidade
                <input name="cidade" placeholder="Sua cidade" required />
              </label>
              <label>
                Cor desejada
                <input name="cor" placeholder="Ex.: preto, branco, azul" />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h2>2. Escolha o tecido</h2>
            <div className="fabric-options">
              {produtos.map((produto) => (
                <label key={produto.id} className="fabric-option">
                  <input
                    type="radio"
                    name="produto"
                    checked={produtoSelecionado?.id === produto.id}
                    onChange={() => setProdutoSelecionado(produto)}
                  />
                  <span>
                    <strong>{produto.nome}</strong>
                    <small>
                      {formatarMoeda(produto.precoUnitario)} até 5 un. • {formatarMoeda(produto.precoComDesconto)} a partir de 6 un.
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>3. Quantidade por tamanho</h2>
            <div className="sizes-grid">
              {tamanhos.map((tamanho) => (
                <label key={tamanho}>
                  {tamanho}
                  <input
                    type="number"
                    min="0"
                    value={quantidades[tamanho]}
                    onChange={(evento) => alterarQuantidade(tamanho, evento.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>4. Entrega e observações</h2>
            <label>
              Forma de entrega
              <select name="entrega" required>
                <option value="Retirada na loja">Retirada na loja</option>
                <option value="Uber Entrega por conta do cliente">Uber Entrega por conta do cliente</option>
                <option value="Entrega própria da empresa entre 18h e 21h, conforme rota disponível">
                  Entrega própria da empresa entre 18h e 21h
                </option>
              </select>
            </label>
            <label>
              Observações sobre arte/modelo
              <textarea name="observacao" placeholder="Descreva detalhes da arte, logo, modelo ou qualquer observação importante." />
            </label>
          </div>

          <button type="submit" className="btn primary full">
            Enviar orçamento para o WhatsApp
          </button>
        </form>

        <aside className="quote-summary">
          <span className="eyebrow">Resumo em tempo real</span>
          <h2>{produtoSelecionado?.nome}</h2>
          <div className="summary-line">
            <span>Quantidade total</span>
            <strong>{resultado.quantidadeTotal}</strong>
          </div>
          <div className="summary-line">
            <span>Preço unitário aplicado</span>
            <strong>{formatarMoeda(resultado.valorUnitarioAplicado)}</strong>
          </div>
          <div className="summary-line">
            <span>Desconto</span>
            <strong>{resultado.possuiDesconto ? "Aplicado" : "Não aplicado"}</strong>
          </div>
          <div className="summary-line">
            <span>Prazo de produção</span>
            <strong>{resultado.prazoProducao}</strong>
          </div>
          <div className="summary-total">
            <span>Valor final bruto</span>
            <strong>{formatarMoeda(resultado.valorTotalBruto)}</strong>
          </div>
          <div className="summary-line">
            <span>Entrada 50%</span>
            <strong>{formatarMoeda(resultado.valorEntrada)}</strong>
          </div>
          <div className="summary-line">
            <span>Restante 50%</span>
            <strong>{formatarMoeda(resultado.valorRestante)}</strong>
          </div>

          <div className="rules-box">
            <h3>Forma de pagamento</h3>
            <ul>
              <li>50% de entrada para iniciar a produção.</li>
              <li>50% na retirada ou entrega.</li>
              <li>Cartão de crédito à vista em 1x sem juros.</li>
              <li>Parcelamentos acima de 1x com juros da maquininha.</li>
              <li>Pix para o CNPJ da empresa.</li>
              <li>Dinheiro em espécie somente na loja física.</li>
              <li>Não recebemos pagamento em dinheiro por entregador.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
