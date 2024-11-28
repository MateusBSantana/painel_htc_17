import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CadastroUsuario from './componetes/CadastroUsuario';
import CadastroTarefa from './componetes/CadastroTarefa';
import TelaTarefas from './componetes/TelaTarefas';

function App() {
  return (
    <Router>
      <div className="app-container d-flex">
        <div className="content flex-grow-1">
          <Routes>
            {/* Rota principal para exibir TelaPrincipal na raiz */}
            <Route path='/' element={<TelaTarefas />} />

            {/* Rota apenas para cadastro de usuário */}
            <Route path='/cadastro_usuario' element={<CadastroUsuario />} />

            {/* Rota apenas para cadastro de tarefa */}
            <Route path='/cadastro_tarefa' element={<CadastroTarefa />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
