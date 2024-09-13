function AbreviaNomeInstrutor(props) {
    const nomes = props.nomeCompleto.split(' ');

    if(nomes.length === 1){
        return[0];
    }

    return (
        nomes[0]+ ' ' + nomes.pop()
    )
}  
    
export default AbreviaNomeInstrutor;