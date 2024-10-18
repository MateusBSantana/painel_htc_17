//Importando pacote do mysql
import mysql from 'mysql2/promise';

//Importando configurações do banco
import db from '../conexao.js'

//Cadastrando Aula
export async function createAula(aula){
    console.log('AulaModel Create')
    const conexao = mysql.createPool(db);
    const sql = `INSERT INTO aulas 
        (data, data_hora_inicio, data_hora_fim, turma, instrutor, unidade_curricular, ambiente)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        aula.data, 
        aula.data_hora_inicio, 
        aula.data_hora_fim, 
        aula.turma, 
        aula.instrutor, 
        aula.unidade_curricular, 
        aula.ambiente];

        try {
            const [retorno] = await conexao.query(sql,params);
            console.log('Aula Cadastrada');
            return[201, retorno];
        } catch (mensagem) {
            console.log(mensagem)
            return(500,mensagem);
        }
}