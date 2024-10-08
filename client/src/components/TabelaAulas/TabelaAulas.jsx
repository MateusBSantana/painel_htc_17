import React, { useEffect, useState } from 'react';
import styles from './TabelaAulas.module.css';
import AbreviaData from './AbreviaData';
import AbreviaAmbiente from './AbreviaAmbiente';
import AbreviaNomeInstrutor from './AbreviaNomeInstrutor';
import AbreviaUnidadeCurricular from './AbreviaUnidadeCurricular';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';

function TabelaAulas({ tipo }) {
  const [aulas, setAulas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      carrearAulas();
    }, 300);
  }, []);

  async function carrearAulas() {
    try {
      const reposta = await fetch('http://localhost:5000/aulas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!reposta) {
        throw new Error('Erro ao buscar aulas');
      }
      const consulta = await reposta.json();
      setAulas(consulta);
      setRemoveLoading(true);

      //console.log(consulta);
    } catch (error) {
      console.log('Erro ao buscar aulas', error);
    }
  }

  async function deletarAulas(id) {
    try {
      const resposta = await fetch(`http://localhost:5000/aulas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta.ok) {
        const error = await resposta.json();
        throw new Error('Erro ao Deletar usuário', error);
      } else {
        alert('Aula deletada com sucesso!');
        setAulas(aulas.filter((aula) => aula.id !== id));
      }
    } catch (error) {
      throw new Error('Erro ao Deletar usuário', error);
    }
  }

  return (
    <div
      className={`${styles.tabelaAulas} ${tipo === 'edit' ? styles.edit : ''}`}
    >
      <table className={styles.tabelaAulas}>
        <thead>
          <tr>
            <th>Inicio</th>
            <th>Fim</th>
            <th>Turma</th>
            <th>Instrutor</th>
            <th>Unidade Curricular</th>
            <th>Ambiente</th>
            {tipo === 'edit' && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{<AbreviaData data={aula.data_hora_inicio} />}</td>
              <td>{<AbreviaData data={aula.data_hora_fim} />}</td>
              <td>{aula.turma}</td>
              <td>{<AbreviaNomeInstrutor nomeCompleto={aula.instrutor} />}</td>
              <td>
                {
                  <AbreviaUnidadeCurricular
                    unidade_curricular={aula.unidade_curricular}
                  />
                }
              </td>
              <td>{<AbreviaAmbiente nomeAmbiente={aula.ambiente} />}</td>
              {tipo === 'edit' && (
                <td className="bg-light">
                  <Link
                    to={`/editar_aula/${aula.id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deletarAulas(aula.id)}
                  >
                    Deletar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!removeLoading && <Loading />}
      {removeLoading && aulas.length === 0 && <h1>Não há aula disponíveis</h1>}
    </div>
  );
}

export default TabelaAulas;
