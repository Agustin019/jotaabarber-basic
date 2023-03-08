import * as React from 'react';
import { useState, useEffect } from 'react';
import Calendar from '../components/calendar'
import moment from 'moment';
import { getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'
import { ClipLoader } from 'react-spinners';
import { obtenerHorasDisponibles } from '../utils/calendarFunctions';
import Horarios from '../components/client/horarios';
import TurnosDeHoy from '../components/client/turnosDeHoy';
import TurnosDeMañana from '../components/client/turnosDeMañana';
import TurnosDeOtrosDias from '../components/client/turnosDeOtrosDias';


export default function Turnos() {

  
  const fechaActual = moment()
  const diaDeHoy = fechaActual.format('DD-MM')

  const [horarios, setHorarios] = useState([])
  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState(diaDeHoy)
  const [loading, setLoading] = useState(true);
  const [ button, setButton ] = useState('hoy')

  const mostrarComponente = () => {
    switch (button) {
      case 'Hoy':
        return <TurnosDeHoy/>;

      case 'Mañana':
        return <TurnosDeMañana/>;

      case 'Otro dia':
        return <TurnosDeOtrosDias/>;

      default: return <TurnosDeHoy/>
    }
  }

 // const horasDisponibles = obtenerHorasDisponibles(horarios)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "horarios", fecha), (doc) => {
      const newData = doc.data().horariosLaborales
      setHorarios(newData)
      setLoading(false)
    });

    return () => {
      unsub();
    };
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Comprobar si se rellenaron los campos
    if (hora === '') {
      console.log('Rellena los campos')
      return
    }
    // Actualizar la disponibilidad de la hora 
    const horaSeleccionada = doc(db, 'horarios', fecha)
    const horaFirebase = await getDoc(horaSeleccionada)
    const horas = horaFirebase.data()
    const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === hora)
    if (encontrarHora !== -1) {
      horas.horariosLaborales[encontrarHora] = {
        ...horas.horariosLaborales[encontrarHora],
        disponible: false
      };
    }

    // Enviar datos del turno a la coleccion 'Turnos' y modificar el documento de la fecha seleccionada
    const docref = doc(db, 'Turnos', fecha)
    const turnoFirebase = await getDoc(docref)
    const turnos = turnoFirebase.data()
    turnos.turnos.push({
      hora: hora,
      cliente: 'Lionel Messi',
      servicio: 'Corte y barba'
    })

    await updateDoc(horaSeleccionada, horas)
    await updateDoc(docref, turnos)
    setLoading(false)
    console.log('Turno reservado')
  }

  return (
    <main className='w-full md:w-[90%] mx-auto '>
      <h2 className='text-center mt-20 font-semibold text-xl text-teal-400 '>Solicita tu turno ahora!</h2>
      <form
        className='flex flex-col items-center justify-between p-4 gap-y-10 w-full md:w-2/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-y-7 items-center '>

          {mostrarComponente()}

          <Calendar
            horarios={horarios}
            setHorarios={setHorarios}
            fecha={fecha}
            setFecha={setFecha}
            hora={hora}
            setHora={setHora}
            loading={loading}
            setLoading={setLoading}
          />
          { /*!loading && <p className={`text-sm font-medium ${horasDisponibles.length < 4 ? 'text-yellow-400' : 'text-green-500'}`}>{horasDisponibles.length < 4 ? '¡Ultimos Lugares!' : 'Hay lugares'}</p> */}
          <ClipLoader loading={loading} />
         {!loading && <Horarios horarios={horarios} setHora={setHora}/>}
        </div>
        {
          !loading ?
            (
              <>
                <div id='elemento-id' className='h-screen'>
                  <p className='text-center mt-20 text-xl font-bold'>Seleccionar servicio</p>
                </div>

                <input
                  type="submit"
                  value="¡Confirmar turno!"
                  className='py-2 px-3 bg-slate-800 text-white font-semibold shadow hover:bg-slate-900 transition-all duration-300'
                />
              </>
            ) : ''
        }
        {/*errores && Object.keys(errores).length > 0 && <Error>{Object.values(errores)}</Error>*/}
      </form>
    </main>
  )
}