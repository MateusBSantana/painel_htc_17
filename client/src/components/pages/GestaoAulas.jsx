import React from 'react';
import TabelaAulas from '../TabelaAulas/TabelaAulas';
import Navbar from "../layout/Navbar";

function GestaoAulas() {
  return (
    <>
      <Navbar/>
      <div className='container'>
        <TabelaAulas tipo='edit'/>
      </div>
    </>
  )
}

export default GestaoAulas
