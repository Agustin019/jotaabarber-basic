import { useState, useEffect } from 'react'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepProfesional from '../../components/client/turnos/stepProfesional'
import StepServicios from '../../components/client/turnos/StepServicios'
import StepfechaYHora from '../../components/client/turnos/StepfechaYHora'

export default function NuevoTurno() {
    const [step, setStep] = useState(0)

    const pasoActual = () => {
        switch (step) {
            case 0:
                return <StepDatosPersonales step={step} setStep={setStep}/>

            case 1:
                return <StepProfesional step={step} setStep={setStep}/>
            case 2:
                return <StepServicios step={step} setStep={setStep}/>
            case 3:
                return <StepfechaYHora step={step} setStep={setStep} />
                default:
                    return <StepDatosPersonales step={step} setStep={setStep}/>
        }
    }
    return (
        <main className='grid grid-cols-[3fr,1fr] grid-rows-2 w-90 mx-auto mt-20'>
            {/* Barra progrediva del formulario */}
            <section className='col-span-1 row-span-1'>
                <h2 className='text-center font-semibold text-3xl'>Aca va  a ir la barra prograsiva</h2>
            </section>
            {/* Aside con la informacion actualizada del turno */}
            <aside className='col-span-1 row-span-2'>
                <h2 className='text-center font-semibold text-3xl'> Aca va la barra lateral</h2>
            </aside>
            {/* Mostrar paso actual del formulario */}
            <section className='col-span-1 row-span-1'>
                {pasoActual()}
            </section>
        </main>

    )
}
