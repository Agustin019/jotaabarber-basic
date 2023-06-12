import React from 'react'
import Turno from './turno'

export default function Turnos({
  turnos,
  setPeriodoTurno,
  periodoTurno,
  filtrarTurnosPorPeriodo,
  fechaSeleccionada,
  setFechaSeleccionada,
  selectedDay,
  diaAbreviado,
  objetoDiaSeleccionado
}) {
  return (
    <div >
      {
        turnos.length !== 0
          ? <div className='flex flex-col md:flex-row items-center justify-center'>
            <div className=' mx-auto md:w-[20%] flex md:flex-col'>
              <button
                onClick={() => {
                  setFechaSeleccionada({})
                  setPeriodoTurno('mañana')
                }}
                className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'mañana' ? 'font-semibold border-b-[2px] md:border-b-0 md:border-l-[5px] border-black' : 'font-light'}`}>
                Mañana
              </button>
              <button
                onClick={() => {
                  setFechaSeleccionada({})
                  setPeriodoTurno('tarde')
                }}
                className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'tarde' ? 'font-semibold border-b-[2px] md:border-b-0 md:border-l-[5px] border-black' : 'font-light'}`}>
                Tarde
              </button>
            </div>
            :


            <div className='w-full  mx-auto flex flex-wrap gap-3 xl:gap-5 h-[99px] md:h-[183px] md:py-4 overflow-y-auto'>
              {
                filtrarTurnosPorPeriodo?.map((turno, i) =>
                  <Turno
                    key={i}
                    turno={turno}
                    fechaSeleccionada={fechaSeleccionada}
                    setFechaSeleccionada={setFechaSeleccionada}
                    selectedDay={selectedDay}
                    diaAbreviado={diaAbreviado}
                    objetoDiaSeleccionado={objetoDiaSeleccionado}
                  />
                )

              }
            </div>
          </div>


          : <div className=' h-[183px] flex justify-center'>
            <p className='text-2xl text-[#1e1e1e] text-center '>No hay turnos para este dia</p>
          </div>

      }

    </div>
  )
}
