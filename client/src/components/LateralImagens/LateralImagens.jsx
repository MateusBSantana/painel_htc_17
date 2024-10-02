import { useEffect, useState } from 'react';
import styles from './LateralImagens.module.css';
import Loading from '../layout/Loading';

function LateralImagens() {
  const [imagens, setImagens] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      carregarImagens();
    }, 300);
  }, []);

  async function carregarImagens() {
    try {
      const reposta = await fetch('http://localhost:5000/imagens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!reposta) {
        throw new Error('Erro ao buscar aulas');
      }
      const consulta = await reposta.json();
      setImagens(consulta);
      setRemoveLoading(true);
    } catch (error) {
      console.log('Erro ao consultar aulas', error);
    }
  }
  return (
    <div className={styles.lateral}>
      {imagens.map((imagem) => (
        <div key={imagem.id}>
          <img src={imagem.caminho} alt={imagem.alt} />
        </div>
      ))}
      {!removeLoading && <Loading />}
    </div>
  );
}

export default LateralImagens;
