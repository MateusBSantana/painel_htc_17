import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home'
import Login from './components/pages/Login';
import CadastroAulas from './components/pages/CadastroAulas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro_aulas' element={<CadastroAulas/>}/>
      </Routes>
    </Router>
  );
}

export default App;
