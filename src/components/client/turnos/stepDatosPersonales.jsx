import React from 'react'

export default function StepDatosPersonales() {
  
  return (
    <article className='flex flex-col  gap-y-12 my-20'>
      <div className='flex flex-col items-start gap-y-2'>
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          className='w-full py-3 px-4 rounded-lg border border-stone-800'       
          type="text"
          placeholder='Nombre completo' 
          id='nombre'
          />
      </div>
      <div className='flex flex-col items-start gap-y-2'>
        <label htmlFor="telefono">Telefono</label>
        <input
          className='w-full py-3 px-4 rounded-lg border border-stone-800'       
          type="number"
          id='telefono'
          placeholder=' ej: 223 633 4422'
          />
      </div>
    </article>
  )
}
