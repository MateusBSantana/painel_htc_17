import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Para fazer requisições ao backend

const TelaTarefas = () => {
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar as tarefas
  const usuarioAtual = 'Nome do Responsável'; // Substitua pelo nome do responsável, por exemplo

  // Carregar as tarefas do backend ao montar o componente
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tarefas'); // Substitua pela URL correta do seu backend
        console.log('Resposta da API:', response.data); // Verifique a estrutura da resposta
        setTarefas(response.data); // Armazena as tarefas no estado
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };
    fetchTarefas();
  }, []);

  // Função para atualizar o status de uma tarefa no backend
  const mudarStatus = async (id, novoStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/tarefas/${id}`, {
        status_tarefa: novoStatus,
        usuario_responsavel: usuarioAtual,
      });
  
      console.log("Resposta do servidor:", response.data); // Log da resposta
  
      if (response.status === 200) {
        // Atualiza o estado local com o novo status
        setTarefas((tarefas) =>
          tarefas.map((tarefa) =>
            tarefa.id_tarefa === id ? { ...tarefa, status_tarefa: novoStatus, usuario_responsavel: usuarioAtual } : tarefa
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gerenciamento de Tarefas</h2>
      <div className="row">
        {/* Coluna A Fazer */}
        <div className="col-md-4">
          <h4 className="text-center">A Fazer</h4>
          <div className="list-group">
            {tarefas.filter((tarefa) => tarefa.status_tarefa === 'A Fazer').map((tarefa) => (
              <div key={tarefa.id_tarefa} className="list-group-item">
                <h5>{tarefa.descricao_tarefa}</h5>
                <p><strong>Setor:</strong> {tarefa.nome_setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Responsável:</strong> {tarefa.usuario}</p>
                <p><strong>Feito por:</strong> {tarefa.usuario_responsavel || 'Não informado'}</p>
                <button className="btn btn-warning btn-sm" onClick={() => mudarStatus(tarefa.id_tarefa, 'Fazendo')}>
                  Mover para Fazendo
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Fazendo */}
        <div className="col-md-4">
          <h4 className="text-center">Fazendo</h4>
          <div className="list-group">
            {tarefas.filter((tarefa) => tarefa.status_tarefa === 'Fazendo').map((tarefa) => (
              <div key={tarefa.id_tarefa} className="list-group-item">
                <h5>{tarefa.descricao_tarefa}</h5>
                <p><strong>Setor:</strong> {tarefa.nome_setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Responsável:</strong> {tarefa.usuario}</p>
                <p><strong>Feito por:</strong> {tarefa.usuario_responsavel || 'Não informado'}</p>
                <button className="btn btn-success btn-sm" onClick={() => mudarStatus(tarefa.id_tarefa, 'Feita')}>
                  Mover para Feita
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Feitas */}
        <div className="col-md-4">
          <h4 className="text-center">Feitas</h4>
          <div className="list-group">
            {tarefas.filter((tarefa) => tarefa.status_tarefa === 'Feita').map((tarefa) => (
              <div key={tarefa.id_tarefa} className="list-group-item">
                <h5>{tarefa.descricao_tarefa}</h5>
                <p><strong>Setor:</strong> {tarefa.nome_setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Responsável:</strong> {tarefa.usuario}</p>
                <p><strong>Feito por:</strong> {tarefa.usuario_responsavel || 'Não informado'}</p>
                <button className="btn btn-secondary btn-sm" onClick={() => mudarStatus(tarefa.id_tarefa, 'A Fazer')}>
                  Reabrir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaTarefas;
