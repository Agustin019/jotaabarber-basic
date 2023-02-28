import { useState } from 'react'
import TurnosDeHoy from '../components/turnosDeHoy'

function Agenda() {

    const [ button, setButton ] = useState(false)

  return (
    <main>
        <h1 className='text-center mt-4 text-4xl text-blue-800 font-bold uppercase'>Agenda de turnos</h1>
        <p className='text-center pt-2 font-semibold text-slate-500'>Podes ver los turnos del dia de hoy o los de otro dia (seleccionar cual)</p>
        <section className='w-full flex justify-center gap-x-10 mt-16'>
            <input 
                type="button" 
                value="Hoy"
                className={`p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 ${!button ? 'bg-blue-600 text-white':'bg-white text-blue-600'}`}
                onClick={()=> setButton(false)} 
            />
            <input 
                type="button" 
                value="Otro dia"
                className={`p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 ${button ? 'bg-blue-600 text-white':'bg-white text-blue-600'}`}
                onClick={()=> setButton(true)} 
            />
        </section>
        <section>
            { 
                !button ? <TurnosDeHoy/> : <p>Seleccionar dia de turnos</p>
            }
        </section>
    </main>
  )
}

export default Agenda