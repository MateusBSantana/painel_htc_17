function AbreviaAmbiente(props) {
    const ambiente = props.nomeAmbiente.split('-');

    if (ambiente.lenght < 2){
        return ambiente
    }
    ambiente.splice(0,2);
    return (
        ambiente.join('-')
    )
}

export default AbreviaAmbiente;