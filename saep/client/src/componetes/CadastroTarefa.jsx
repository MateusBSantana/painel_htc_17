import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CadastroTarefa = () => {
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [nomeSetor, setNomeSetor] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]); 
  // Carregar a lista de usuários ao iniciar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuario'); // Substitua pela URL correta do seu backend
        setUsuarios(response.data); // Armazena os usuários no estado
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envia a tarefa para o backend
    try {
      const response = await axios.post('http://localhost:5000/tarefas', {
        descricao_tarefa: descricaoTarefa,
        nome_setor: nomeSetor,
        prioridade: prioridade,
        status_tarefa: statusTarefa,
        id_usuario: usuario, 
      });

      if (response.status === 201) {
        alert(`Tarefa cadastrada com sucesso!\nID: ${response.data.id_tarefa}`);
        setDescricaoTarefa('');
        setNomeSetor('');
        setPrioridade('');
        setStatusTarefa('');
        setUsuario('');
      }
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      alert("Erro ao cadastrar tarefa!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="descricaoTarefa" className="form-label">Descrição da Tarefa</label>
          <textarea
            className="form-control"
            id="descricaoTarefa"
            rows="3"
            placeholder="Digite a descrição da tarefa"
            value={descricaoTarefa}
            onChange={(e) => setDescricaoTarefa(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="nomeSetor" className="form-label">Nome do Setor</label>
          <input
            type="text"
            className="form-control"
            id="nomeSetor"
            placeholder="Digite o nome do setor"
            value={nomeSetor}
            onChange={(e) => setNomeSetor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prioridade" className="form-label">Prioridade</label>
          <select
            className="form-select"
            id="prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="statusTarefa" className="form-label">Status da Tarefa</label>
          <select
            className="form-select"
            id="statusTarefa"
            value={statusTarefa}
            onChange={(e) => setStatusTarefa(e.target.value)}
          >
            <option value="">Selecione...</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuário Responsável</label>
          <select
            className="form-select"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          >
            <option value="">Selecione um usuário...</option>
            {usuarios.map((user) => (
              <option key={user.id_usuario} value={user.id_usuario}>
                {user.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Tarefa</button>
      </form>
    </div>
  );
};

export default CadastroTarefa;
