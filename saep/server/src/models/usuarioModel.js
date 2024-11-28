import db from '../conexao.js';

// Função para buscar usuário pelo email
export async function getUserByEmail(email) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      return [200, rows[0]]; // Usuário encontrado
    } else {
      return [404, { message: "Usuário não encontrado" }]; // Usuário não encontrado
    }
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    return [500, { message: "Erro ao buscar usuário", error: error.message }];
  }
}

// Função para criar um novo usuário
export async function createUsuario(nome, email) {
  try {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );

    return [201, { message: "Usuário criado com sucesso", id_usuario: result.insertId }];
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return [500, { message: "Erro ao criar usuário", error: error.message }];
  }
}

// Função para listar todos os usuários
export async function readUsuario() {
  try {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return [200, rows];
  } catch (error) {
    console.error("Erro ao ler usuários:", error);
    return [500, { message: "Erro ao ler usuários", error: error.message }];
  }
}

// Função para mostrar um único usuário
export async function showOneUsuario(id_usuario) {
  try {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);

    if (rows.length > 0) {
      return [200, rows[0]]; // Usuário encontrado
    } else {
      return [404, { message: "Usuário não encontrado" }]; // Usuário não encontrado
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return [500, { message: "Erro ao buscar usuário", error: error.message }];
  }
}
