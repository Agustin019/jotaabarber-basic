import { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'

import BarraProgresiva from '../../components/client/turnos/barraProgresiva'
import ResumenTurno from '../../components/client/turnos/resumenTurno'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepProfesional from '../../components/client/turnos/stepProfesional'
import StepServicios from '../../components/client/turnos/stepServicios'
import StepfechaYHora from '../../components/client/turnos/stepFechaYHora'
import { BotonAvanzar, BotonAvanzarDeshabilitado, BotonCancelar, BotonConfirmarTurno } from '../../components/client/turnos/buttons'
import { db } from '../../utils/firebaseconfig'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'




export default function NuevoTurno() {

    //Formulario paso a paso
    const [step, setStep] = useState(0)
    const { datosUsuarioActual } = useAuth()
    console.log(datosUsuarioActual)
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')

    // step servicio
    const [servicioSeleccionado, setServicioSeleccionado] = useState({})
    // step profesional
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState({})
    // step fecha
    const [fechaSeleccionada, setFechaSeleccionada] = useState({})

    console.log(fechaSeleccionada)
    const navigate = useNavigate()
    const pasoActual = () => {
        switch (step) {
            case 0:
                return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono} />

            case 1:
                return <StepServicios servicioSeleccionado={servicioSeleccionado} setServicioSeleccionado={setServicioSeleccionado} />
            case 2:
                return <StepProfesional profesionalSeleccionado={profesionalSeleccionado} setProfesionalSeleccionado={setProfesionalSeleccionado} />
            case 3:
                return <StepfechaYHora fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada} />
            default:
                return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono} />
        }
    }

    const validarPasos = () => {
        switch (step) {
            case 0 : if (telefono === '' || nombre === '') {
                return <BotonAvanzarDeshabilitado step={step}/>  
              } else {
                return <BotonAvanzar step={step} setStep={setStep}/> 
              }
            case 1:
                if (Object.keys(servicioSeleccionado).length === 0) {
                    return <BotonAvanzarDeshabilitado step={step} />  
                  } else {
                    return <BotonAvanzar step={step} setStep={setStep}/> 
                  }
            case 2:
                if (Object.keys(profesionalSeleccionado).length === 0) {
                    return <BotonAvanzarDeshabilitado step={step} />  
                  } else {
                    return <BotonAvanzar step={step} setStep={setStep}/> 
                  }
            case 3:
                if (Object.keys(fechaSeleccionada).length === 0) {
                    return <BotonAvanzarDeshabilitado step={step}/>  
                  } else {
                    return <BotonConfirmarTurno/> 
                  }
            default:
                return <BotonAvanzarDeshabilitado/>
        }
    }


    const handleSubmit = async e => {
        e.preventDefault()
     
      // Actualizar la disponibilidad de la hora 
      const horaSeleccionada = doc(db, 'horarios', fechaSeleccionada.dia)
      const horaFirebase = await getDoc(horaSeleccionada)
      const horas = horaFirebase.data()
     
      const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === fechaSeleccionada.hora)
      if (encontrarHora !== -1) {
        horas.horariosLaborales[encontrarHora] = {
          ...horas.horariosLaborales[encontrarHora],
          disponible: false
        };
      }
      await updateDoc(horaSeleccionada, horas)
      console.log('Disponibilidad de horario actualizada')
     // Enviar datos del turno a la coleccion 'Turnos' y modificar el documento de la fecha seleccionada
      const docRefTurno = doc(db, 'Turnos', fechaSeleccionada.dia)
      const turnoFirebase = await getDoc(docRefTurno)
      const turnos = turnoFirebase.data()
      console.log(turnos)
      turnos.turnos.push({
        id:fechaSeleccionada.id,
        objetoDiaSeleccionado:fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia:fechaSeleccionada.nombreDia,
        dia:fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono:telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre
      })
      await updateDoc(docRefTurno, turnos)
      console.log('turno enviado al documento de turnos')

      const docRefUsuario = doc(db, 'usuarios', datosUsuarioActual.uid)
      const userDoc = await getDoc(docRefUsuario)
      const userTurnos = userDoc.data()
      console.log(userTurnos)
      userTurnos.turnosActivos.push({
        id:fechaSeleccionada.id,
        objetoDiaSeleccionado:fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia:fechaSeleccionada.nombreDia,
        dia:fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono:telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre,
      })
      

      await updateDoc(docRefUsuario, userTurnos)
      console.log('turno enviadoa  los turnos activos del usuario logueado')
      //setLoading(false)
      console.log('Turno reservado')
      navigate('/usuario')
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
                   <form
                        onSubmit={handleSubmit}
                   >
                     <div className=' relative w-[90%] h-[400px] mx-auto flex flex-col justify-center'>
                         {pasoActual()}
                     </div>
                    
                     <div className='flex justify-between mx-auto w-[90%] '>
                         <BotonCancelar/>
                         {validarPasos()}
                     </div>
                   </form>
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
