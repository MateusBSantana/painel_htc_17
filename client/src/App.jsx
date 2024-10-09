import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home'
import Login from './components/pages/Login';
import CadastroAulas from './components/pages/CadastroAulas';
import GestaoAulas from './components/pages/GestaoAulas';
import EditarAulas from './components/pages/EditarAulas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro_aulas' element={<CadastroAulas/>}/>
        <Route path='/gestao_aulas' element={<GestaoAulas/>}/>
        <Route path='/editar_aula/:id' element={<EditarAulas/>}/>
        <Route path='/gestao_aulas/:tipo' element={<GestaoAulas/>}/>
      </Routes>
    </Router>
  );
}

export default App;
