import {
  createUsuario,
  readUsuario,
  showOneUsuario,
  getUserByEmail,
} from "../models/usuarioModel.js";

// Função para criar um usuário
export async function criarUsuario(req, res) {
  console.log("UsuarioController :: criarUsuario");

  const { nome, email } = req.body;

  // Validar se o nome e email foram informados
  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e email devem ser informados" });
  }

  try {
    // Verificar se o usuário já existe
    const [status, resposta] = await getUserByEmail(email);

    if (status === 200) {
      return res.status(200).json({
        message: "Usuário encontrado",
        dados: resposta,
      });
    } else {
      // Caso não exista, cria o usuário
      const [createStatus, createResponse] = await createUsuario(nome, email);
      return res.status(createStatus).json(createResponse);
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({
      message: "Erro ao criar usuário",
      details: error.message,
    });
  }
}

// Função para listar todos os usuários
export async function mostrarUsuario(req, res) {
  console.log("UsuarioController :: mostrarUsuario");

  try {
    const [status, resposta] = await readUsuario();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao exibir usuários" });
  }
}

// Função para exibir um único usuário
export async function mostrarUmUsuario(req, res) {
  console.log("UsuarioController :: mostrarUmUsuario");
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({ message: "ID do usuário deve ser informado" });
  } else {
    try {
      const [status, resposta] = await showOneUsuario(id_usuario);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao exibir o usuário" });
    }
  }
}
