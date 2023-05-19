import { useState, useEffect } from 'react'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepProfesional from '../../components/client/turnos/stepProfesional'
import StepServicios from '../../components/client/turnos/stepServicios'
import StepfechaYHora from '../../components/client/turnos/stepFechaYHora'
import { useNavigate } from 'react-router-dom'
import BarraProgresiva from '../../components/client/turnos/barraProgresiva'


export default function NuevoTurno() {
    const [step, setStep] = useState(0)
    const navigate = useNavigate()
    const pasoActual = () => {
        switch (step) {
            case 0:
                return <StepDatosPersonales />

            case 1:
                return <StepServicios />
            case 2:
                return <StepProfesional />
            case 3:
                return <StepfechaYHora />
            default:
                return <StepDatosPersonales />
            // default:
            //     return <StepDatosPersonales />
        }
    }
    return (
        <main className='grid grid-cols-[3fr,1fr]  gap-x-4 w-[90%] mx-auto '>
            {/* Barra progrediva del formulario */}
            <section className='col-span-1 flex flex-col justify-between mt-10'>

                <article className='flex flex-col gap-y-20 w-[80%] mx-auto'>

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
                    <div className=' relative max-w-[80%] h-[400px] mx-auto flex flex-col justify-center'>
                        {pasoActual()}
                    </div>

                    <div className='flex justify-between mx-auto w-[80%]'>
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
            <aside className='col-span-1  bg-stone-800 h-full'>
                <h2 className='text-center font-semibold text-3xl text-white'>  barra lateral</h2>
            </aside>
        </main>

    )
}
