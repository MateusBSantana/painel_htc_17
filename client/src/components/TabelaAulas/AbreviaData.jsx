function AbreviaData(props) {
    const hora_aula = new Date(props.data);
    return hora_aula.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' });
}
export default AbreviaData;