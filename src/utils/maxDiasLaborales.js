import moment from 'moment'; // importa la librería moment.js

const MAX_DIAS = 14; // define el máximo de días para crear documentos
const fechaActual = moment(); // obtén la fecha actual

// crea un arreglo con las fechas futuras a partir de la fecha actual, solo los días jueves, viernes y sábado
export const diasDisponibles = Array.from({
    length: MAX_DIAS
}, (_, index) => {
    const fecha = moment(fechaActual).add(index, 'day');
    const diaDeLaSemana = fecha.day();
    if (diaDeLaSemana === 4 || diaDeLaSemana === 5 || diaDeLaSemana === 6) {
        return fecha.format('DD-MM');
    }
    return null;
}).filter(fecha => fecha !== null);

console.log(diasDisponibles)

 
// ahora puedes utilizar el arreglo diasDisponibles para crear los documentos en Firebase