import * as React from 'react';
import { useState, useEffect } from 'react';
import Calendar from '../components/calendar'
import moment from 'moment';
import { getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'
import { ClipLoader } from 'react-spinners';
import { obtenerHorasDisponibles } from '../utils/calendarFunctions';
import Error from '../components/error';


export default function Turnos() {

  const fecha = moment()
  const diaDeHoy = fecha.format('DD-MM')

  const [horarios, setHorarios] = useState([])
  const [hora, setHora] = useState('')
  const [value, setValue] = useState(diaDeHoy)
  let [loading, setLoading] = useState(true);

  const horasDisponibles = obtenerHorasDisponibles(horarios)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "horarios", value), (doc) => {
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
    const horaSeleccionada = doc(db, 'horarios', value)
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
    const turno = doc(db, 'Turnos', value)
    const turnoFirebase = await getDoc(turno)
    const turnos = turnoFirebase.data()
    turnos.turnos.push({
      hora: hora,
      cliente: 'Lionel Messi',
      servicio: 'Corte y barba'
    })


    await updateDoc(horaSeleccionada, horas)
    await updateDoc(turno, turnos)



    setLoading(false)
    console.log('Turno reservado')
  }


  return (
    <div >
      <h2 className='text-center mt-20 font-semibold text-xl text-teal-400 '>Solicita tu turno ahora!</h2>
      <form
        className='flex flex-col items-center justify-between p-4 gap-y-10 w-1/3 mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-y-7 items-center'>
          <Calendar
            horarios={horarios}
            setHorarios={setHorarios}
            value={value}
            setValue={setValue}
            hora={hora}
            setHora={setHora}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <ClipLoader loading={loading} />
        {
          !loading ?
            (
              <>
                <p className={`text-sm font-medium ${horasDisponibles.length < 4 ? 'text-yellow-400' : 'text-green-500'}`}>{horasDisponibles.length < 4 ? '¡Ultimos Lugares!' : 'Hay lugares'}</p>
                <select
                  id="hora"
                  name='hora'
                  value={hora}
                  onChange={e => setHora(e.target.value)}
                  className='py-3 px-5 border border-slate-300 '
                >
                  <option value="">Selecciona la hora</option>
                  {
                    horasDisponibles.map(hora => (
                      <option key={hora} value={hora}>{hora}</option>
                    ))
                  }
                </select>
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
    </div>
  )
}
