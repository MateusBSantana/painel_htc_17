import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import FormAula from '../FormAula/FormAula';
import { useParams } from "react-router-dom";

function EditarAulas() {
  const {id} = useParams();
  async function editaula(infoAula,id) {
    try {
      //O POST é usado para inserir elementos na API
      const resposta = await fetch(`http://localhost:5000/aulas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoAula),
      });

      if (!resposta.ok) {
        console.log('Erro ao editar aula');
      } else {
        alert('Aula Editada');
      }
    } catch (error) {
      console.error('Erro na edição da aula', error);
    }
  }

  return (
    <div>
      <Navbar />
      <FormAula titulo='Editar Aula' txtBtn='Salvar' id={id} handleSubmit={editaula}/>
    </div>
  );
}

export default EditarAulas;
