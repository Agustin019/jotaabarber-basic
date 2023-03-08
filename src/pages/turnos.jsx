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
import { dias } from '../utils/helpers';

export default function Turnos() {


  const fechaActual = moment()
  const diaDeHoy = fechaActual.format('DD-MM')

  const [hora, setHora] = useState('')
  const [fecha, setFecha] = useState(diaDeHoy)
  const [loading, setLoading] = useState(true);
  const [button, setButton] = useState('Hoy')

  const mostrarComponente = () => {
    switch (button) {
      case 'Hoy':
        return <TurnosDeHoy loading={loading} setLoading={setLoading} setHora={setHora}/>;

      case 'Mañana':
        return <TurnosDeMañana loading={loading} setLoading={setLoading} hora={hora} setHora={setHora} />;

      case 'Otro dia':
        return <TurnosDeOtrosDias loading={loading} setLoading={setLoading} fecha={fecha} setFecha={setFecha} setHora={setHora}/>;

      default: return <TurnosDeHoy loading={loading} setLoading={setLoading} setHora={setHora}/>
    }
  }

  // const horasDisponibles = obtenerHorasDisponibles(horarios)
 

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

      <section className='w-full flex justify-center gap-x-10 my-16'>
        {
          dias.map(dia =>
            <input
              key={dia.id}
              type="button"
              value={dia.name}
              className={`
                p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 
                ${button === dia.name 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600'}
                `}
              onClick={() => setButton(dia.name)}
            />
          )
        }
      </section>

      <form
        className='flex flex-col items-center justify-between p-4 gap-y-10 w-full md:w-2/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-y-7 items-center '>
          {mostrarComponente()}

          <ClipLoader loading={loading} />
         
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