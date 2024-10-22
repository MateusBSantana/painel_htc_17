import { createAula, readAulas, updateAula, deleteAula } from '../models/AulaModel.js';

export async function cadastroAula(req, res) {
  //Criando constante aula
  const aula = req.body;
  try {
    //Declarando status com o codigo da resposta e resposta como Json
    const [status, resposta] = await createAula(aula);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function mostrandoAulas(req, res) {
  console.log('AulaController mostrandoAulas');

  try {
    const [status, resposta] = await readAulas();
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function atulizandoAulas(req, res) {
  console.log('AulaController AtulizandoAula');
  const { id } = req.params;
  const aula = req.body;

  try {
    const [status, resposta] = await updateAula(aula, id);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function excluindoAula(req, res) {
  console.log('AulaController excluindoAula');
  const { id } = req.params;

  try {
    const [status, resposta] = await deleteAula(id);
    res.status(status).json(resposta);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
} 