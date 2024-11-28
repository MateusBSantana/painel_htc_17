import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dados do usuário
    const usuarioData = { nome: name, email: email };

    try {
      // Enviar dados ao backend (backend rodando na porta 5000)
      const response = await fetch('http://localhost:5000/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);  // Exibe mensagem de sucesso
        setError(null);  // Limpa mensagens de erro
      } else {
        setError(result.message);  // Exibe mensagem de erro
        setSuccess(null);  // Limpa mensagens de sucesso
      }
    } catch (err) {
      setError('Erro ao cadastrar usuário');
      setSuccess(null);
      console.error('Erro:', err);
    } finally {
      // Limpar campos após o envio
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastro de Usuário</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
