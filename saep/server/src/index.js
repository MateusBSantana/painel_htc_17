import express from 'express';
import cors from 'cors';
import { 
  criarUsuario, 
  mostrarUsuario, 
  mostrarUmUsuario 
} from './controllers/UsuarioController.js';

import { cadastroTarefa, mostrandoTarefas, mostrandoUmaTarefa, atualizandoTarefa, excluindoTarefa } from './controllers/tarefasController.js';


const app = express();
const porta = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Funcionando');
});

// Rotas de CRUD de usuarios
app.post('/usuario', criarUsuario);
app.get('/usuario', mostrarUsuario);
app.get('/usuario/:id_usuario', mostrarUmUsuario);

// Rotas de CRUD de tarefas
app.post('/tarefas', cadastroTarefa);
app.get('/tarefas', mostrandoTarefas);
app.get('/tarefas/:id_tarefa', mostrandoUmaTarefa);
app.put('/tarefas/:id_tarefa', atualizandoTarefa);
app.delete('/tarefas/:id_tarefa', excluindoTarefa);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
