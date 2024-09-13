function AbreviaAmbiente(props) {
    // Copia o array ambiente para evitar mutações do array original
    const ambiente = props.nomeAmbiente.split('-');
    
    
    if(ambiente.lenght < 2){
        return ambiente;
    }
    ambiente.splice(0,2);

    return(
        ambiente.join('-')
    )
}

export default AbreviaAmbiente;