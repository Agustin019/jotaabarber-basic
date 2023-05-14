import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function StepDatosPersonales({step, setStep}) {
  const navigate = useNavigate()
  return (
    <article className='flex flex-col items-center'>
      <p onClick={() => navigate(- 1 )}>volver</p>
      <h2 className='text-center font-semibold text-2xl text-stone-800'>Datos personales</h2>
      <input type="text" />
      <input type="text" />
      <button 
        className='p-2 bg-stone-700 text-white font-semibold text-lg rounded-md'
        onClick={() => setStep(step + 1)}
        >
          Siguiente paso
      </button>
    </article>
  )
}
