import { useState, useEffect } from 'react'
import BarraProgresiva from '../../components/client/turnos/barraProgresiva'
import ResumenTurno from '../../components/client/turnos/resumenTurno'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepProfesional from '../../components/client/turnos/stepProfesional'
import StepServicios from '../../components/client/turnos/stepServicios'
import StepfechaYHora from '../../components/client/turnos/stepFechaYHora'
import { useNavigate } from 'react-router-dom'


export default function NuevoTurno() {
    
    //Formulario paso a paso
    const [step, setStep] = useState(0)

    const [ nombre, setNombre ] = useState('')
    const [ telefono, setTelefono ] = useState(0)

    // step servicio
    const [ servicioSeleccionado, setServicioSeleccionado ] = useState({})
    // step profesional
    const [ profesionalSeleccionado, setProfesionalSeleccionado ] = useState({})
    // step fecha
    const [ fechaSeleccionada, setFechaSeleccionada ] = useState({})

    const navigate = useNavigate()
    const pasoActual = () => {
        switch (step) {
            case 0:
                return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono} />

            case 1:
                return <StepServicios servicioSeleccionado={servicioSeleccionado} setServicioSeleccionado={setServicioSeleccionado}/>
            case 2:
                return <StepProfesional profesionalSeleccionado={profesionalSeleccionado} setProfesionalSeleccionado={setProfesionalSeleccionado}/>
            case 3:
                return <StepfechaYHora fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada}/>
            default:
                return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono}/>
        }
    }
    return (
        <main className='grid grid-cols-1 md:grid-cols-[3fr,1fr]  gap-x-4  '>
            {/* Barra progrediva del formulario */}
            <section className='col-span-1 flex flex-col justify-between mt-10'>

                <article className='flex flex-col gap-y-10 w-[90%] mx-auto'>

                    <div
                        className=' flex justify-start items-center w-56 gap-x-2  cursor-pointer text-lg font-medium uppercase'
                        onClick={step === 0 ? () => navigate(- 1) : () => setStep(step - 1)}
                    >
                        <ion-icon name="arrow-back-sharp"></ion-icon>
                        <p>{step === 0 ? 'volver' : 'Paso anterior'}</p>
                    </div>

                    <BarraProgresiva step={step} />
                </article>
                {/* Aside con la informacion actualizada del turno */}
                {/* Mostrar paso actual del formulario */}
                <article className=' col-span-1 w-full'>
                <div className=' relative w-[90%] h-[400px] mx-auto flex flex-col justify-center'>
                        {pasoActual()}
                    </div>

                    <div className='flex justify-between mx-auto w-[90%] '>
                        <button
                            className='py-3 px-5 h-[51px] border border-stone-900 w-[356px] text-stone-900 bg-white font-semibold text-lg rounded-md'
                            onClick={() => navigate(- 1)}
                        >
                            Cancelar reserva
                        </button>
                        <button
                            className='
                         py-3 px-5 h-[51px] w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md
                          flex justify-center items-center gap-2
                         '
                            onClick={() => setStep(step + 1)}
                        >
                            Siguiente paso
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </button>
                    </div>
                </article>
            </section>
            <ResumenTurno 
                nombre={nombre} 
                telefono={telefono}
                servicioSeleccionado={servicioSeleccionado}
                profesionalSeleccionado={profesionalSeleccionado}
                fechaSeleccionada={fechaSeleccionada}
                />
           
        </main>

    )
}
