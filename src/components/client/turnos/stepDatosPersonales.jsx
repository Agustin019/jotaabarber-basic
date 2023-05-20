import React from 'react'

export default function StepDatosPersonales({ nombre,setNombre }) {
  
  return (
    <div className='w-full mx-auto flex flex-col  gap-y-12'>
      <div className='flex flex-col items-start gap-y-2'>
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          id='nombre'
          type="text"
          placeholder='Nombre completo'
          value={nombre} 
          onChange={e => setNombre(e.target.value)}
          className='w-full py-3 px-4 rounded-lg border border-stone-800'       
          />
      </div>
      <div className='flex flex-col items-start gap-y-2'>
        <label htmlFor="telefono">Telefono</label>
        <input
          id='telefono'
          type="number"
          placeholder=' ej: 223 633 4422'
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className='w-full py-3 px-4 rounded-lg border border-stone-800'       
          />
      </div>
    </div>
  )
}
