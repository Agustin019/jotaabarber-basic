import React from 'react'
import Turno from './turno'

export default function Turnos({ 
    setPeriodoTurno, 
    periodoTurno, 
    filtrarTurnosPorPeriodo, 
    setFechaSeleccionada, 
    selectedDay,
    diaAbreviado
}) {
  return (
    <div className='flex '>
        <div className='w-[20%] flex flex-col'>
            <button
                onClick={() => setPeriodoTurno('mañana')}
                className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'mañana' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                Mañana
            </button>
            <button
                onClick={() => setPeriodoTurno('tarde')}
                className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'tarde' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                Tarde
            </button>
        </div>
    <div className='w-[80%] grid grid-cols-3 gap-y-5 gap-x-10'>
      {
        filtrarTurnosPorPeriodo?.map((turno, i) => 
            <Turno 
                key={i} 
                turno={turno}
                setFechaSeleccionada={setFechaSeleccionada}
                selectedDay={selectedDay}
                diaAbreviado={diaAbreviado}
            />
             )
      }
    </div>
  </div>
  )
}
