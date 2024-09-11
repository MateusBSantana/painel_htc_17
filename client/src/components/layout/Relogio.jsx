import {useEffect, useState} from 'react';
import styles from './Relogio.module.css';

function Relogio() {
    const [hora, setHora] = useState('');

    //useEffect acionando carregamento da pagina
    useEffect(()=> {
        atualizaHorario();

        const intervalo = setInterval(atualizaHorario, 1000);

        // Interrompe a função ao desmontar o elemento
        return () =>{
            clearInterval(intervalo);
        }
    })

    function atualizaHorario(){
        //Declarando o Objeto do tipo Date
        const agora = new Date();

        //Pegando hora, minutos e segundos
        const horaMinutosSegundos = agora.toLocaleTimeString('pt-br', {hour: '2-digit', minute: '2-digit', second: '2-digit'});

        setHora(horaMinutosSegundos);
    }


    return (
        // Chamando constante do tipo hora
        <div className={styles.relogio}>{hora}</div>
    )
}

export default Relogio;
