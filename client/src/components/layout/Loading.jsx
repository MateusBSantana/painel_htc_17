import React from 'react'
import imgLoad from '../../img/loading.svg'
import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading_componente}>
      <img src={imgLoad} alt="Carregando" />
    </div>
  )
}

export default Loading
