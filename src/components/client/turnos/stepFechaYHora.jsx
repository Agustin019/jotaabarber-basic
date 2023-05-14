import React from 'react'

export default function StepFechaYHora({ step, setStep }) {
  return (
    <article className='flex flex-col items-center'>
      <h2 className='text-center font-semibold text-2xl text-stone-800'>Seleccionar fecha</h2>
      <input type="text" />
      <input type="text" />
      <button
        className='p-2 bg-stone-700 text-white font-semibold text-lg rounded-md'
        //onClick={() => setStep(+1)}
      >
        Siguiente paso
      </button>
    </article>
  )
}
