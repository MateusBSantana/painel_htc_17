import React from 'react';
import styles from './Home.module.css';
import Cabecalho from '../layout/Cabecalho';
import TabelaAulas from '../TabelaAulas/TabelaAulas';
import LateralImagens from '../LateralImagens/LateralImagens';


function Home() {
    return(
        <>
            <Cabecalho/>
            <TabelaAulas/>
            <LateralImagens/>
        </>
    )
}

export default Home;