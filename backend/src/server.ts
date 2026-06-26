import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

function gerarCodigo(): string {
  return "#" + Math.floor(100000 + Math.random() * 900000);
}

/* ROTA DE TESTE */
app.get("/", (req: Request, res: Response) => {
  res.json({
    mensagem: "API ReVest rodando com TypeScript!",
  });
});

/* CADASTRO */
app.post("/api/cadastro", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Preencha todos os campos.",
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        erro: "A senha precisa ter no mínimo 6 caracteres.",
      });
    }

    const usuarioExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (usuarioExiste) {
      return res.status(400).json({
        erro: "Este e-mail já está cadastrado.",
      });
    }

    const usuario = await prisma.user.create({
      data: {
        codigo: gerarCodigo(),
        name: nome,
        email,
        password: senha,
      },
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao cadastrar usuário.",
    });
  }
});

/* LOGIN */
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Informe e-mail e senha.",
      });
    }

    const usuario = await prisma.user.findFirst({
      where: {
        email,
        password: senha,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos.",
      });
    }

    const usuarioAtualizado = await prisma.user.update({
      where: {
        id: usuario.id,
      },
      data: {
        ultimoLogin: new Date(),
      },
    });

    return res.json(usuarioAtualizado);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao fazer login.",
    });
  }
});

/* LISTAR USUÁRIOS */
app.get("/api/usuarios", async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar usuários.",
    });
  }
});

/* PRODUTOS */
app.get("/api/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = [
      {
        id: 1,
        nome: "Tecido Frio (Dry Fit)",
        preco: 42,
        precoAtacado: 30,
      },
      {
        id: 2,
        nome: "AeroDry",
        preco: 45,
        precoAtacado: 37,
      },
      {
        id: 3,
        nome: "Elanca Lite",
        preco: 38,
        precoAtacado: 27,
      },
    ];

    return res.json(produtos);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar produtos.",
    });
  }
});

/* CRIAR PEDIDO / ORÇAMENTO */
app.post("/api/pedidos", async (req: Request, res: Response) => {
  try {
    const {
      userId,
      productName,
      quantity,
      size,
      color,
      city,
      phone,
      note,
      total,
    } = req.body;

    if (!userId || !productName || !quantity || !total) {
      return res.status(400).json({
        erro: "Dados do pedido incompletos.",
      });
    }

    const pedido = await prisma.order.create({
      data: {
        codigo: gerarCodigo(),
        userId: Number(userId),
        productName,
        quantity: Number(quantity),
        size,
        color,
        city,
        phone,
        note,
        total: Number(total),
        entrada: Number(total) / 2,
        restante: Number(total) / 2,
      },
    });

    return res.status(201).json(pedido);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao salvar pedido.",
    });
  }
});

/* LISTAR PEDIDOS */
app.get("/api/pedidos", async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar pedidos.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});