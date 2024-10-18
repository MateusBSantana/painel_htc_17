//Importando pacote express
import express from 'express';

import { cadastroAula } from './controllers/AulaController.js';

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



app.get('/aulas', (req, res)=>{
    res.status(200).json(
        [
            {
                "id": "1282",
                "data": "2024-08-29T03:00:00.000Z",
                "data_hora_inicio": "2024-08-29T21:00:00.000Z",
                "data_hora_fim": "2024-08-30T01:00:00.000Z",
                "turma": "UMO-MBMM-03",
                "instrutor": "THADEU VASCONCELOS DA SILVA GOMES",
                "unidade_curricular": "MECÂNICA BÁSICA DE MOTORES DE MOTOCICLETAS (CH: 100.0000)",
                "ambiente": "VTRIA-EXTER-EXTERNO",
                "chave": null 
            }
        ]
    )
});

app.listen(porta, ()=>{
    console.log(`API Funcionado na porta ${porta}`);
});