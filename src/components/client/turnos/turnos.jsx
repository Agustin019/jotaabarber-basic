import React, { useEffect, useState } from 'react'
import Turno from './turno'
import format from 'date-fns/format';
import es from 'date-fns/locale/es';

export default function Turnos({
  turnos,
  servicioSeleccionado,
  fechaSeleccionada,
  setFechaSeleccionada,
  selectedDay,
  diaAbreviado,
  objetoDiaSeleccionado
}) {
  const [periodoTurno, setPeriodoTurno] = useState('mañana');
  const [turnosFiltrados, setTurnosFiltrados] = useState([])
  const filtrarTurnosPorPeriodo = turnosFiltrados.filter(turno => turno.periodo === periodoTurno)


  console.log(turnosFiltrados)
  const fechaFormateada = format(selectedDay, "EEEE dd-MM", { locale: es });
  
  const turnosDeCortes = turnos.filter(turno => turno.servicio === 'corte')
  const turnosDeColores = turnos.filter(turno => turno.servicio === 'color')
  useEffect(()=>{
    const filtrarTurnos = () => {
      if(servicioSeleccionado.nombre === 'Corte'){
        setTurnosFiltrados(turnosDeCortes)
      }else{
        setTurnosFiltrados(turnosDeColores)
      }
    }
    filtrarTurnos()
  },[])

  useEffect(()=>{
    const filtrarTurnos = () => {
      if(servicioSeleccionado.nombre === 'Corte' || servicioSeleccionado.nombre === 'Corte y barba' ){
        setTurnosFiltrados(turnosDeCortes)
      }else{
        setTurnosFiltrados(turnosDeColores)
      }
    }
    filtrarTurnos()

  },[turnos])
  
  return (
    <div>
      {
        turnos.length !== 0
          ? (
            <div >
              <p className='text-center'>Turnos del día <span className='capitalize font-medium text-xl'>{fechaFormateada}</span></p>
              <div className='flex flex-col md:flex-row items-center justify-center gap-y-4'>
                <div className=' mx-auto md:w-[20%] flex md:flex-col '>
                  <button
                    type='button'
                    onClick={() => {
                      setFechaSeleccionada({})
                      setPeriodoTurno('mañana')
                    }}
                    className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'mañana' ? 'font-semibold border-b-[2px] md:border-b-0 md:border-l-[5px] border-black' : 'font-light'}`}
                  >
                    Mañana
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setFechaSeleccionada({})
                      setPeriodoTurno('tarde')
                    }}
                    className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoTurno === 'tarde' ? 'font-semibold border-b-[2px] md:border-b-0 md:border-l-[5px] border-black' : 'font-light'}`}
                  >
                    Tarde
                  </button>
                </div>

              
                 <div className={` w-[95%] px-1 mx-auto flex flex-wrap justify-center items-center last:justify-start gap-3 xl:gap-2 h-[184px] pb-2 md:py-4 
                 ${servicioSeleccionado.nombre === 'Corte' || servicioSeleccionado.nombre === 'Corte y barba'
                 ? 'overflow-y-auto' : 'overflow-hidden'}
                 `}
                 >
                   {
                   filtrarTurnosPorPeriodo?.length !== 0
                       ? (
                     filtrarTurnosPorPeriodo.map((turno, i) => (
                
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
                         )
                        )
                      :
                      <div className='h-[183px] overflow-hidden flex flex-col items-center justify-center w-full col-span-2'>
                        <p className='text-lg md:text-2xl text-[#1e1e1e] text-center'>No hay turnos para este servicio en este dia </p>
                       </div>
                   }
                 </div>
              </div>
            </div>
          ) : (
            <div className='h-[183px] flex justify-center'>
              <p className='text-2xl text-[#1e1e1e] text-center'>No hay turnos para este día</p>
            </div>
          )
      }
    </div>
  )
}
