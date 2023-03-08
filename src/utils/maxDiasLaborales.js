import moment from 'moment'; 

const MAX_DIAS = 14; // máximo de días para crear documentos
const HOY_Y_MAÑANA = 2 // dia actual y dia siguiente para consultar por turnos
const fechaActual = moment(); //  fecha actual

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


// Arreglo para acceder a los dias de hoy y mañana
export const dias_Hoy_Y_Mañana = Array.from({
    length: HOY_Y_MAÑANA
}, (_, index) => {
    const fecha = moment(fechaActual).add(index, 'day');   
    return fecha.format('DD-MM');
})
