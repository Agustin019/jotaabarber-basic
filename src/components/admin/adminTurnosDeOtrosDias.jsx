import React ,{ useEffect, useState } from 'react'
import Turno from './turno'
import { maxDate3, shouldDisableDate } from '../../utils/calendarFunctions'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { ClipLoader } from 'react-spinners'
import moment from 'moment';
import 'moment/locale/es'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function TurnosDeOtrosDias({ loading, setLoading }) {

    const [selectedDate, handleDateChange] = React.useState(moment())
    const [turnosDiaSeleccionado, setTurnosDiaSeleccionado] = useState([])

    useEffect( () =>{
        const fechaFormateada = selectedDate.format('DD-MM');
        const obtenerTurnosDelDiaSeleccionado = async () =>{
            setLoading(true)
            const docref = doc(db, 'Turnos', fechaFormateada)
            const documentoSeleccionado = await getDoc(docref)
            const turnosConsultados = documentoSeleccionado.data().turnos
            //console.log(turnosConsultados)
            setTurnosDiaSeleccionado(turnosConsultados)
            setLoading(false)
        }
        obtenerTurnosDelDiaSeleccionado()
    },[selectedDate] )

   console.log(turnosDiaSeleccionado)
    return (
        <article>
            <div className='w-full flex flex-col justify-center items-center my-10'>
                <h2 className='font-bold text-xl text-teal-500 py-8'>Seleccionar dia</h2>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        name='fecha'
                        id='fecha'
                        label="Selecciona la fecha"
                        renderInput={(params) => <TextField {...params} value={selectedDate}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }} />}
                        value={selectedDate}
                        onChange={date => handleDateChange(date)}
                        minDate={moment()}
                        maxDate={maxDate3(13)}
                        shouldDisableDate={shouldDisableDate}
                    />
                </LocalizationProvider>
            </div>
            <div className='w-full flex justify-center'> 
                <ClipLoader loading={loading}/>                            
            </div>
            {
            !turnosDiaSeleccionado.length
                ? <h2 className='text-center text-xl text-teal-500 font-medium py-8'>¡No hay turnos para este dia!</h2>
                : (
                    <>
                     <h2 className='text-center text-xl text-teal-500 font-medium py-8'>Turnos del dia: {selectedDate.format('DD [/] MM')}</h2>
                     {turnosDiaSeleccionado.map(turno => <Turno key={turno.hora} turno={turno} />)}
                    </>
                )
             }
        </article>
    )
}
