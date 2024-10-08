import React from 'react';
import TabelaAulas from '../TabelaAulas/TabelaAulas';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

function GestaoAulas() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center my-3">Gestão aulas</h1>
        <div className="text-end">
          <Link className="btn btn-primary mb-3" to="/cadastro_aulas">
            Cadastro aula
          </Link>
        </div>
        <TabelaAulas tipo="edit" />
      </div>
    </>
  );
}

export default GestaoAulas;
