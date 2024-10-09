import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FormAula({titulo, txtBtn, handleSubmit, id, tipo}) {
  const navigate = useNavigate();  
  const [dataAula, setDataAula] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [turma, setTurma] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [unidadeCurricular, setUnidadeCurricular] = useState('');
  const [ambiente, setAmbiente] = useState('');

  useEffect(()=>{
    if(id){
        baixarAula(id);
    };
  }, []);

  //Função temporaria para cadastro de data
  function formatDataHora(data, hora) {
    const dataHora = `${data}T${hora}:00.000Z`;
    return dataHora;
  }

async function baixarAula(id){
    try {
        const resposta = await fetch(`http://localhost:5000/aulas/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const respostaJSON = await resposta.json();
        if(!resposta.ok){
            console.debug('Erro ao baixar aula', respostaJSON)
        }else{
            setTurma(respostaJSON.turma);
            setInstrutor(respostaJSON.instrutor);
            setUnidadeCurricular(respostaJSON.unidade_curricular);
            setAmbiente(respostaJSON.ambiente);

            console.log(respostaJSON);
        }
    } catch (error) {
        
    }
  }

  function submit(e) {
    //Criando o objeto que será carregado para o POST da API
    e.preventDefault();

    const infoAula = {
      data: formatDataHora(dataAula, '00:00'),
      data_hora_inicio: formatDataHora(dataAula, horaInicio),
      data_hora_fim: formatDataHora(dataAula, horaFim),
      turma: turma,
      instrutor: instrutor,
      unidade_curricular: unidadeCurricular,
      ambiente: ambiente,
      chave: null,
    };
    handleSubmit(infoAula,id);
    navigate(`/gestao_aulas/${tipo}`);
  };

  return <div>
    <div className="container justify-content-center col-sm-12 col-md-6 col-lg-3">
      <h2 className="text-center">{titulo}</h2>
      <form onSubmit={submit}>
        <label className="form-label">Data:</label>
        <input
          className="form-control"
          type="date"
          name=""
          id=""
          value={dataAula}
          onChange={(e) => setDataAula(e.target.value)}
        />

        <label className="form-label">Hora Inicio:</label>
        <input
          className="form-control"
          type="time"
          name=""
          id=""
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />

        <label className="form-label">Hora Fim:</label>
        <input
          className="form-control"
          type="time"
          name=""
          id=""
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
        />

        <label className="form-label">Turma:</label>
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        />

        <label className="form-label">Instrutor:</label>
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          value={instrutor}
          onChange={(e) => setInstrutor(e.target.value)}
        />

        <label className="form-label">Unidade Curricular:</label>
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          value={unidadeCurricular}
          onChange={(e) => setUnidadeCurricular(e.target.value)}
        />

        <label className="form-label">Ambiente:</label>
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          value={ambiente}
          onChange={(e) => setAmbiente(e.target.value)}
        />

        <Link className="btn btn-danger mt-2">Cancelar</Link>
        <button className="btn btn-success mt-2 float-end" type="submit">
          {txtBtn}
        </button>
      </form>
    </div>
  </div>;
}

export default FormAula;
