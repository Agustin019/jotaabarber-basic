import { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { db } from '../../utils/firebaseconfig'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { BotonAvanzar, BotonAvanzarDeshabilitado, BotonCancelar, BotonConfirmarTurno } from '../../components/client/turnos/buttons'
import BarraProgresiva from '../../components/client/turnos/barraProgresiva'
import ResumenTurno from '../../components/client/turnos/resumenTurno'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepProfesional from '../../components/client/turnos/stepProfesional'
import StepServicios from '../../components/client/turnos/stepServicios'
import StepfechaYHora from '../../components/client/turnos/stepFechaYHora'
import PantallaTurnoConfirmado from '../../components/client/turnos/pantallaTurnoConfirmado'
import { v4 as uuidv4 } from "uuid";



export default function NuevoTurno() {

    //Formulario paso a paso
    const [step, setStep] = useState(3)
    const { datosUsuarioActual } = useAuth()

    // step datos personales
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    // step servicio
    const [servicioSeleccionado, setServicioSeleccionado] = useState({})
    // step profesional
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState({})
    // step fecha
    const [fechaSeleccionada, setFechaSeleccionada] = useState({})

    const [ modal, setModal ] = useState(false)
    const turnoId = uuidv4(); // Generar un UUID

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
        userId:datosUsuarioActual.uid,
        turnoId:turnoId,
        objetoDiaSeleccionado:fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia:fechaSeleccionada.nombreDia,
        dia:fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono:telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre,
        estado:'confirmado'
      })
      await updateDoc(docRefTurno, turnos)
      console.log('turno enviado al documento de turnos')

      const docRefUsuario = doc(db, 'usuarios', datosUsuarioActual.uid)
      const userDoc = await getDoc(docRefUsuario)
      const userTurnos = userDoc.data()
      console.log(userTurnos)
      userTurnos.turnosActivos.push({
        turnoId:turnoId,
        userId:datosUsuarioActual.uid,
        objetoDiaSeleccionado:fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia:fechaSeleccionada.nombreDia,
        dia:fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono:telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre,
        estado:'confirmado'
      })
      

      await updateDoc(docRefUsuario, userTurnos)
      console.log('turno enviadoa  los turnos activos del usuario logueado')
      //setLoading(false)
      console.log('Turno reservado')

      setModal(true)
    }

    return (
        <main className='grid grid-cols-1 lg:grid-cols-[3fr,1fr]  gap-x-2  '>
            {/* Barra progrediva del formulario */}
            {
              modal && <PantallaTurnoConfirmado modal={modal}/>
            }
            <section className='col-span-1 max-w-[100%]  '>

                <article className='flex flex-col gap-y-5 md:gap-y-10 w-[90%] my-5 mx-auto'>

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
                        className='my-10'
                   >
                     <div className=' relative w-[90%] h-[350px] mx-auto '>
                         {pasoActual()}
                     </div>
                    
                     <div className='flex flex-col-reverse items-center gap-y-7 md:flex-row md:justify-between mx-auto w-[80%] xl:pt-20 '>
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
