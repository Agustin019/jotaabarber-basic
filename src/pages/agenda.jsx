import { useState } from 'react'
import TurnosDeHoy from '../components/turnosDeHoy'
import TurnosDeOtrosDias from '../components/turnosDeOtrosDias'
import { ClipLoader } from 'react-spinners'
import TurnosDeMañana from '../components/turnosDeMañana'

function Agenda() {

    const [ button, setButton ] = useState('Hoy')
    const [ loading, setLoading ] = useState(false)

    const mostarComponente = () =>{
        switch (button) {
            case 'Hoy':
                return <TurnosDeHoy loading={loading} setLoading={setLoading}/>;

            case 'Mañana':
                return <TurnosDeMañana loading={loading} setLoading={setLoading}/>;
            
            case 'Otro dia':
                return <TurnosDeOtrosDias loading={loading} setLoading={setLoading}/>;
            
            default:
                return <TurnosDeHoy loading={loading} setLoading={setLoading}/>;
        }
    }
  return (
    <main>
        <h1 className='text-center mt-4 text-4xl text-blue-800 font-bold uppercase'>Agenda de turnos</h1>
        <p className='text-center pt-2 font-semibold text-slate-500'>Podes ver los turnos del dia de hoy o los de otro dia (seleccionar cual)</p>
        <section className='w-full flex justify-center gap-x-10 mt-16'>
            <input 
                type="button" 
                value="Hoy"
                className={`p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 ${button === 'Hoy' ? 'bg-blue-600 text-white':'bg-white text-blue-600'}`}
                onClick={()=> setButton('Hoy')} 
            />
            <input 
                type="button" 
                value="Mañana"
                className={`p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 ${button === 'Mañana'? 'bg-blue-600 text-white':'bg-white text-blue-600'}`}
                onClick={()=> setButton('Mañana')} 
            />
            <input 
                type="button" 
                value="Otro dia"
                className={`p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 ${button === 'Otro dia' ? 'bg-blue-600 text-white':'bg-white text-blue-600'}`}
                onClick={()=> setButton('Otro dia')} 
            />
        </section>
        <section>
            
            { 
               // !button ? <TurnosDeHoy loading={loading} setLoading={setLoading}/> : <TurnosDeOtrosDias/>
               mostarComponente()
            }
        </section>
    </main>
  )
}

export default Agenda