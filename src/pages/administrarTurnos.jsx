import { useState } from 'react'
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'
import { useEffect } from 'react'
import AdministrarTurno from '../components/admin/administrarTurno'
import { maxDate3, shouldDisableDate } from '../utils/calendarFunctions'
import moment from 'moment';
import 'moment/locale/es'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AdministrarTurnos() {
  const [horarios, setHorarios] = useState([])
  const [selectedDate, handleDateChange] = useState(moment())


  const fechaFormateada = selectedDate.format('DD-MM');

  // useEffect(() => {
  //   const obtenerHoras = async () => {
  //     const docref = doc(db, 'horarios', fechaFormateada)
  //     const horasFirebase = await getDoc(docref)
  //     const horas = horasFirebase.data().horariosLaborales
  //     setHorarios(horas)
  //     console.log(horas)
  //   }
  //   obtenerHoras()
  // }, [selectedDate])

  const cambiarEstadoDeTurno = async (hora, disponible) => {
    const docref = doc(db, 'horarios', fechaFormateada)
    const turnoDoc = await getDoc(docref)
    const turnos = turnoDoc.data()
    const encontrarHora = turnos.horariosLaborales.findIndex(turno => turno.hora === hora)
    console.log(hora)
    //console.log(disponible)
    console.log(encontrarHora)
    console.log(turnos.horariosLaborales[encontrarHora])
    if (disponible) {
      turnos.horariosLaborales[encontrarHora] = {
        ...turnos.horariosLaborales[encontrarHora],
        disponible: false
      };
    } else {
      turnos.horariosLaborales[encontrarHora] = {
        ...turnos.horariosLaborales[encontrarHora],
        disponible: true
      };
    }
    await updateDoc(docref, turnos)
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'horarios', fechaFormateada), (doc) => {
      const newData = doc.data().horariosLaborales
      setHorarios(newData)
     // setLoading(false)
    });

    return () => {
      unsub();
    };
  }, [selectedDate])

  return (
    <main className='w-[80%] mx-auto'>
      <h2 className='text-xl font-bold text-teal-600 text-center mt-20'>Administrar turnos</h2>

      <section className='w-full flex flex-col justify-center '>
        <article>
          <div className='w-full flex flex-col justify-center items-center'>
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
        </article>
        <article className='py-10'>
          <h2 className='py-8 text-center text-teal-400 text-xl font-bold'>Turnos del dia: $fecha</h2>
          {
            horarios.map(hora =>
              <AdministrarTurno key={hora.hora} horas={hora} cambiarEstadoDeTurno={cambiarEstadoDeTurno} />
            )
          }
        </article>
      </section>
    </main>
  )
}
