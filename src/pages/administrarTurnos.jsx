import React, { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'

export default function AdministrarTurnos() {
    const [ horarios, setHorarios ] = useState([])
    const obtenerHoras = async () => {
        const docref = doc(db, 'horarios', '11-03')
        const horasFirebase = await getDoc(docref)
        const horas = horasFirebase.data().horariosLaborales
        setHorarios(horas)
        console.log(horas)
    }
    //obtenerHoras()

  return (
    <main className='w-[80%] mx-auto'>
        <h2 className='text-xl font-bold text-teal-600 text-center mt-20'>Administrar turnos</h2>

        <section className='w-full flex flex-col justify-center items-center'>
           {
            horarios.map(hora => 
            <div key={hora.hora} className='w-[50%] py-5 rounded-md shadow-sm flex justify-between'>
                <p>{hora.hora}</p>
                <div className='flex gap-x-4'>
                   <button className={`${hora.disponible ? 'bg-gray-500': 'bg-green-500'} p-1 rounded-full shadow text-white font-bold`}><ion-icon name="checkmark-done-outline"></ion-icon></button>
                   <button className={`${hora.disponible ? 'bg-red-500': 'bg-gray-500'} p-1 rounded-full shadow text-white font-bold`}><ion-icon name="close-outline"></ion-icon></button>
                </div>
            </div>
            )
           }
        </section>
    </main>
  )
}
