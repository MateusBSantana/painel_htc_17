import { createTarefa, readTarefas, showOneTarefa, updateTarefa, deleteTarefa } from '../models/tarefasModel.js';

// Função para criar uma nova tarefa
export async function cadastroTarefa(req, res) {
  const { descricao_tarefa, nome_setor, prioridade, status_tarefa, id_usuario } = req.body;

  if (!descricao_tarefa || !nome_setor || !prioridade || !status_tarefa || !id_usuario) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const [status, resposta] = await createTarefa(descricao_tarefa, nome_setor, prioridade, status_tarefa, id_usuario);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao cadastrar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar tarefa' });
  }
}

// Função para listar todas as tarefas
export async function mostrandoTarefas(req, res) {
  try {
    const [status, resposta] = await readTarefas();
    return res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    return res.status(500).json({ message: 'Erro ao listar tarefas' });
  }
}

// Função para mostrar uma tarefa específica
export async function mostrandoUmaTarefa(req, res) {
  const { id_tarefa } = req.params;

  if (!id_tarefa) {
    return res.status(400).json({ message: 'ID da tarefa é obrigatório' });
  }

  try {
    const [status, resposta] = await showOneTarefa(id_tarefa);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao mostrar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao mostrar tarefa' });
  }
}

// Função para atualizar uma tarefa
export async function atualizandoTarefa(req, res) {
  const { id_tarefa } = req.params;
  const { descricao_tarefa, nome_setor, prioridade, status_tarefa } = req.body;

  if (!descricao_tarefa || !nome_setor || !prioridade || !status_tarefa) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const [statusCode, resposta] = await updateTarefa(id_tarefa, descricao_tarefa, nome_setor, prioridade, status_tarefa);
    return res.status(statusCode).json(resposta);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
}

// Função para excluir uma tarefa
export async function excluindoTarefa(req, res) {
  const { id_tarefa } = req.params;

  if (!id_tarefa) {
    return res.status(400).json({ message: 'ID da tarefa é obrigatório' });
  }

  try {
    const [status, resposta] = await deleteTarefa(id_tarefa);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    return res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
}
