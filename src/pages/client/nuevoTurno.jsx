import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { db } from '../../utils/firebaseconfig'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { BotonAvanzar, BotonAvanzarDeshabilitado, BotonCancelar, BotonConfirmarTurno } from '../../components/client/turnos/buttons'
import BarraProgresiva from '../../components/client/turnos/barraProgresiva'
import ResumenTurno from '../../components/client/turnos/resumenTurno'
import StepDatosPersonales from '../../components/client/turnos/stepDatosPersonales'
import StepServicios from '../../components/client/turnos/stepServicios'
import StepfechaYHora from '../../components/client/turnos/stepFechaYHora'
import PantallaTurnoConfirmado from '../../components/client/turnos/pantallaTurnoConfirmado'
import { v4 as uuidv4 } from "uuid";

import PantallaCargando from '../../components/utils/pantallaCargando'

export default function NuevoTurno() {
  // context
  const { datosUsuarioActual } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)

  //Formulario paso a paso

  const [step, setStep] = useState(0)
  // step datos personales
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  // step servicio
  const [servicioSeleccionado, setServicioSeleccionado] = useState({})
  // step fecha
  const [fechaSeleccionada, setFechaSeleccionada] = useState({})

  // modal
  const [modal, setModal] = useState(false)

  // Estado para abrir o cerrar el resumen
  const [ resumen, setResumen ] = useState(false)
  const handleResumen = () => {
    setResumen(!resumen)
  }

  // Generar un UUID
  const turnoId = uuidv4(); 

  console.log(fechaSeleccionada)
  const navigate = useNavigate()

  const pasoActual = () => {
    switch (step) {
      case 0:
        return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono} />

      case 1:
        return <StepServicios servicioSeleccionado={servicioSeleccionado} setServicioSeleccionado={setServicioSeleccionado} />

      case 2:
        return <StepfechaYHora fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada} servicioSeleccionado={servicioSeleccionado} />

      default:
        return <StepDatosPersonales nombre={nombre} setNombre={setNombre} telefono={telefono} setTelefono={setTelefono} />
    }
  }

  const validarPasos = () => {
    switch (step) {
      case 0: if (telefono === '' || nombre === '') {
        return <BotonAvanzarDeshabilitado step={step} />
      } else {
        return <BotonAvanzar step={step} setStep={setStep} />
      }
      case 1:
        if (Object.keys(servicioSeleccionado).length === 0) {
          return <BotonAvanzarDeshabilitado step={step} />
        } else {
          return <BotonAvanzar step={step} setStep={setStep} />
        }
      case 2:
        if (Object.keys(fechaSeleccionada).length === 0) {
          return <BotonAvanzarDeshabilitado step={step} />
        } else {
          return <BotonConfirmarTurno />
        }
      default:
        return <BotonAvanzarDeshabilitado />
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Actualizar la disponibilidad de la hora
      const horaSeleccionadaRef = doc(db, 'horarios', fechaSeleccionada.dia);
      const horaSeleccionadaSnapshot = await getDoc(horaSeleccionadaRef);
      const horas = horaSeleccionadaSnapshot.data();
  
      const encontrarHoraIndex = horas.horariosLaborales.findIndex((obj) => obj.hora === fechaSeleccionada.hora);
      if (encontrarHoraIndex !== -1) {
        horas.horariosLaborales[encontrarHoraIndex] = {
          ...horas.horariosLaborales[encontrarHoraIndex],
          disponible: false,
        };
      }
      await updateDoc(horaSeleccionadaRef, horas);
      console.log('Disponibilidad de horario actualizada');
  
      // Enviar datos del turno a la colección 'Turnos' y modificar el documento de la fecha seleccionada
      const docRefTurno = doc(db, 'Turnos', fechaSeleccionada.dia);
      const turnoSnapshot = await getDoc(docRefTurno);
      const turnos = turnoSnapshot.data();
      console.log(turnos);
  
      turnos.turnos.push({
        id: fechaSeleccionada.id,
        userId: datosUsuarioActual.uid,
        turnoId: turnoId,
        objetoDiaSeleccionado: fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia: fechaSeleccionada.nombreDia,
        dia: fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono: telefono,
        servicio: servicioSeleccionado.nombre,
        estado: 'confirmado',
      });
  
      await updateDoc(docRefTurno, turnos);
      console.log('Turno enviado al documento de turnos');
  
      // Agregar turno a los turnos activos del usuario logueado
      const docRefUsuario = doc(db, 'usuarios', datosUsuarioActual.uid);
      const userDoc = await getDoc(docRefUsuario);
      const userTurnos = userDoc.data();
      console.log(userTurnos);
  
      userTurnos.turnosActivos.push({
        turnoId: turnoId,
        userId: datosUsuarioActual.uid,
        objetoDiaSeleccionado: fechaSeleccionada.objetoDiaSeleccionado,
        nombreDia: fechaSeleccionada.nombreDia,
        dia: fechaSeleccionada.dia,
        hora: fechaSeleccionada.hora,
        cliente: nombre,
        telefono: telefono,
        servicio: servicioSeleccionado.nombre,
        estado: 'confirmado',
      });
  
      await updateDoc(docRefUsuario, userTurnos);
      console.log('Turno enviado a los turnos activos del usuario logueado');
  
      setIsLoading(false);
      console.log('Turno reservado');
      setModal(true);
    } catch (error) {
      console.log('Error al reservar el turno:', error);
      toast.error("Ups, algo salio mal.", "error")
      setIsLoading(false);
    }
  };
  return (
    <main className='max-w-screen w-full overflow-hidden relative'>
        {
          isLoading && <PantallaCargando isLoading={isLoading}/>
        }
      <section className='flex gap-x-2  '>
        {
          modal && <PantallaTurnoConfirmado modal={modal} />
        }
        <article className='w-full lg:max-w-[70%] '>
          <div className='flex flex-col gap-y-3 md:gap-y-10 w-[90%] my-5 mx-auto'>
      
            <div className='flex justify-between'>
              <div
                className=' flex text-blanco justify-start items-center w-56 gap-x-2  cursor-pointer text-lg font-medium uppercase'
                onClick={step === 0 ? () => navigate(- 1) : () => setStep(step - 1)}
              >
                <ion-icon name="arrow-back-sharp"></ion-icon>
                <p>{step === 0 ? 'volver' : 'Paso anterior'}</p>
              </div>
              <button
                onClick={handleResumen} 
                className='bg-amarillo py-[10px] px-[11px] rounded-lg lg:hidden text-negroPrincipal text-2xl flex items-center'>
                <ion-icon name="newspaper"></ion-icon>
              </button>
            </div>
            <BarraProgresiva step={step} />
          </div>
          {/* Aside con la informacion actualizada del turno */}
          {/* Mostrar paso actual del formulario */}
          <div className=' col-span-1 max-w-screen w-full'>
            <form
              onSubmit={handleSubmit}
              className=''
            >
              <div className=' relative sm:max-w-[97%] h-[350px] mx-auto '>
                {pasoActual()}
              </div>
      
              <div className='flex flex-col-reverse   items-center gap-y-3 md:flex-row md:justify-between mx-auto w-[90%] pt-20 mb-1'>
                <BotonCancelar />
                {validarPasos()}
              </div>
            </form>
          </div>
        </article>
        <ResumenTurno
          nombre={nombre}
          telefono={telefono}
          servicioSeleccionado={servicioSeleccionado}
          fechaSeleccionada={fechaSeleccionada}
          resumen={resumen}
          handleResumen={handleResumen}
        />
      
      </section>
    </main>

  )
}
