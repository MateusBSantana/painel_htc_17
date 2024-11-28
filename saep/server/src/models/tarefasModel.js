import db from '../conexao.js';

// Função para criar uma nova tarefa
export async function createTarefa(descricao_tarefa, nome_setor, prioridade, status_tarefa, id_usuario) {
    try {
      // Usando o método query()
      const [result] = await db.query(
        'INSERT INTO tarefas (descricao_tarefa, nome_setor, prioridade, status_tarefa, id_usuario, data_cadastro) VALUES (?, ?, ?, ?, ?, CURDATE())',
        [descricao_tarefa, nome_setor, prioridade, status_tarefa, id_usuario]
      );
      return [201, { message: 'Tarefa criada com sucesso', id_tarefa: result.insertId }];
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      return [500, { message: 'Erro ao criar tarefa', error: error.message }];
    }
  }
  
// Função para listar todas as tarefas
export async function readTarefas() {
    try {
      // Usando o método query()
      const [rows] = await db.query('SELECT * FROM tarefas');
      return [200, rows];
    } catch (error) {
      console.error('Erro ao ler tarefas:', error);
      return [500, { message: 'Erro ao ler tarefas', error: error.message }];
    }
  }

// Função para mostrar uma tarefa específica
export async function showOneTarefa(id_tarefa) {
  try {
    const [rows] = await db.mysql('SELECT * FROM tarefas WHERE id_tarefa = ?', [id_tarefa]);
    if (rows.length > 0) {
      return [200, rows[0]];
    } else {
      return [404, { message: 'Tarefa não encontrada' }];
    }
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    return [500, { message: 'Erro ao buscar tarefa', error: error.message }];
  }
}

// Função para atualizar uma tarefa
export async function updateTarefa(id_tarefa, descricao_tarefa, nome_setor, prioridade, status_tarefa) {
    try {
      // Usando o método query()
      const [result] = await db.query(
        'UPDATE tarefas SET descricao_tarefa = ?, nome_setor = ?, prioridade = ?, status_tarefa = ? WHERE id_tarefa = ?',
        [descricao_tarefa, nome_setor, prioridade, status_tarefa, id_tarefa]
      );
      if (result.affectedRows > 0) {
        return [200, { message: 'Tarefa atualizada com sucesso' }];
      } else {
        return [404, { message: 'Tarefa não encontrada' }];
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return [500, { message: 'Erro ao atualizar tarefa', error: error.message }];
    }
  }

// Função para excluir uma tarefa
export async function deleteTarefa(id_tarefa) {
  try {
    const [result] = await db.mysql('DELETE FROM tarefas WHERE id_tarefa = ?', [id_tarefa]);
    if (result.affectedRows > 0) {
      return [200, { message: 'Tarefa excluída com sucesso' }];
    } else {
      return [404, { message: 'Tarefa não encontrada' }];
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    return [500, { message: 'Erro ao excluir tarefa', error: error.message }];
  }
}
