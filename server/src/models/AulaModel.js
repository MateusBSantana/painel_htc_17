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

//Lendo Aula
export async function readAulas() {
    console.log("AulaModel: readAulas");
    const conexao = mysql.createPool(db);

    const sql = 'SELECT * FROM aulas';

    try {
        const [retorno] = await conexao.query(sql);
        console.log('Mostrando Aulas');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return[500,error];
    }
}

//Editando Aula
export async function updateAula(aula, id) {
    console.log("AulaModel: updateAulas");
    const conexao = mysql.createPool(db);
    const sql = `UPDATE aulas SET 
        data = ?, 
        data_hora_inicio= ?,
        data_hora_fim = ?,
        turma = ?,
        instrutor = ?,
        unidade_curricular = ?,
        ambiente = ?
        WHERE id = ?`;
    
        const params = [
            aula.data, 
            aula.data_hora_inicio, 
            aula.data_hora_fim, 
            aula.turma, 
            aula.instrutor, 
            aula.unidade_curricular, 
            aula.ambiente,
            id,
        ];

        try {
            const [retorno] = await conexao.query(sql, params);
            console.log('Atualizando Aulas');
            return [200, retorno];
        } catch (error) {
            console.log(error);
            return[500,error];
        }
}

export async function  deleteAula(id) {
    console.log("AulaModel: deleteAulas");
    const conexao = mysql.createPool(db);
    const sql = 'DELETE FROM aulas WHERE id = ?';
    const params = [id];
    try {
        const [retorno] = await conexao.query(sql, params);
        console.log('Deletando Aulas');
        return [200, retorno];
    } catch (error) {
        console.log(error);
        return[500,error];
    }
}