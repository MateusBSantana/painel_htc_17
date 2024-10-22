//Importando pacote express
import express from 'express';

import { atulizandoAulas, cadastroAula, mostrandoAulas, excluindoAula } from './controllers/AulaController.js';

//Instaciando objeto express
const app = express();
const porta = 5000;

//Configurando comunicação em JSON
app.use(express.json());

//Rota de teste da APi
app.get('/', (req,res)=>{
    res.send('API Funcionado');
});

//Rotas de CRUD de aulas
app.post('/aulas', cadastroAula);
app.get('/aulas', mostrandoAulas);
app.put('/aulas/:id', atulizandoAulas);
app.delete('/aulas/:id', excluindoAula);


app.listen(porta, ()=>{
    console.log(`API Funcionado na porta ${porta}`);
});