import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import Calendar from '../components/calendar'
import moment from 'moment';
import { getDocs, getDoc, collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'



export async function action({ request }){
  const formData = await request.formData()
  const datos = Object.FromEntries(formData)
  console.log(datos)

  return {}
}

export default function Turnos() {

  const fecha = moment()
  const diaDeHoy = fecha.format('DD-MM')

  const [horarios, setHorarios] = useState([])
  const [value, setValue] = useState(diaDeHoy)


  useEffect(() => {
    async function obtenerDocumento() {
      const docRef = doc(db, 'horarios', value)
      const docSnap = await getDoc(docRef)
      const nuevaConsulta = docSnap.data().horariosLaborales
      setHorarios(nuevaConsulta)
    }
    obtenerDocumento()
  }, [])


  return (
    <div className='flex flex-col items-center justify-between p-4 gap-y-10'>
      <h2 className='text-center mt-20 font-semibold text-xl text-teal-400'>Solicita tu turno ahora!</h2>
     <Form
        method='post'
      >
      <div className='flex flex-col gap-y-7 items-center'>
         <Calendar horarios={horarios} setHorarios={setHorarios} value={value} setValue={setValue} />
         <input 
          type="submit" 
          value="¡Confirmar turno!"
          className='py-2 px-3 bg-slate-800 text-white font-semibold shadow hover:bg-slate-900 transition-all duration-300'
          />
      </div>
     </Form>
    </div>
  )
}
