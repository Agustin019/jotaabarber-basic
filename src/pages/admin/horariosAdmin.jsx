import { useState, useEffect } from 'react'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Horario from '../../components/admin/horario';
import PantallaCargando from '../../components/utils/pantallaCargando'

import Switch from 'react-switch'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from '../../components/admin/dashBoard';



export default function HorariosAdmin() {
  const [horarios, setHorarios] = useState([])
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [periodoHorario, setPeriodoHorario] = useState('mañana')
  const filtarHorariosPorPeriodo = horarios.filter(horario => horario.periodo === periodoHorario)

  const [horariosModificados, setHorariosModificados] = useState([]);


  // Estado para manejar la apertura del calendario
  const [isOpen, setIsOpen] = useState(false);
  const fechaFormateada = format(selectedDay, 'dd-MM');
  console.log(horariosModificados)

  const [isLoading, setIsLoading] = useState(false)


  const consultarHorarios = () => {
    const docRef = doc(db, 'horarios', fechaFormateada)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setHorarios(snapshot.data().horariosLaborales)
    })
    console.log(horarios)
    return () => {
      unsubscribe()
    }
  }

  useEffect(() => {
    consultarHorarios();
    setHorariosModificados([])
    checkInitialAvailability();
  }, [selectedDay]);

  useEffect(() => {
    consultarHorarios();
    checkInitialAvailability();
  }, []); // Llamar al cargar el componente

  const [switchEnabled, setSwitchEnabled] = useState(false);

  const checkInitialAvailability = async () => {
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    const hasAvailability = dataHorarios.some(horario => horario.disponible);

    setSwitchEnabled(hasAvailability);
  };


  const deshabilitarTodoLosTurnos = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    // Actualizar el campo 'disponible' de todos los horarios a 'false'
    const nuevosHorarios = dataHorarios.map(horario => ({
      ...horario,
      disponible: false
    }));

    // Guardar los horarios actualizados en Firestore
    await updateDoc(docRef, { horariosLaborales: nuevosHorarios });
    setIsLoading(false)
    toast.success('Todos los turnos deshabilitados correctamente')
  }
  const habilitarTodosLosTurnos = async () => {
    setIsLoading(true)
    const docRef = doc(db, 'horarios', fechaFormateada);
    const docHorarios = await getDoc(docRef);
    const dataHorarios = docHorarios.data().horariosLaborales;

    // Actualizar el campo 'disponible' de todos los horarios a 'false'
    const nuevosHorarios = dataHorarios.map(horario => ({
      ...horario,
      disponible: true
    }));

    // Guardar los horarios actualizados en Firestore
    await updateDoc(docRef, { horariosLaborales: nuevosHorarios });
    setIsLoading(false)
    toast.success('Todos los turnos habilitados correctamente')
  }


  const handleDateChange = (date) => {
    setSelectedDay(date);
    setIsOpen(!isOpen);
  }


  const guardarCambios = async () => {
    try {
      setIsLoading(true)
      // Obtiene una copia del arreglo horarios
      const horariosActualizados = [...horarios];

      // Actualiza los horarios modificados según los cambios en horariosModificados
      horariosModificados.forEach((horarioModificado) => {
        const horarioExistente = horariosActualizados.find((horario) => horario.id === horarioModificado.id);
        if (horarioExistente) {
          horarioExistente.disponible = horarioModificado.disponible;
        }
      });

      // Actualiza los horarios en Firestore
      const docRef = doc(db, 'horarios', fechaFormateada);
      await updateDoc(docRef, { horariosLaborales: horariosActualizados });
      consultarHorarios()

      console.log('Horarios actualizados correctamente');
      setHorariosModificados([])
      toast.success('Horarios actualizados correctamente')
      setIsLoading(false)
    } catch (error) {
      console.error('Error al actualizar los horarios:', error);
    }
  };


  return (
  <>
  <DashBoard/>
      <main className='lg:ml-[250px] p-3 md:p-10 flex flex-col gap-y-7 min-h-screen bg-negroSecundario'>
        <ToastContainer />
        <section>
          <article className='flex flex-col gap-y-5 items-start text-blancoSecundario'>
            <h1 className='font-semibold text-2xl'>Horarios</h1>
            <p className='font-ligh text-lg'>¡Administra tus horarios a tu manera!</p>
          </article>
          <article className='flex flex-col gap-y-5 items-start mt-10 text-blancoSecundario'>
            <h2 className='font-semibold text-xl'>Horarios del día {''}</h2>
            <div className='flex flex-col gap-3 md:flex-row justify-between w-full'>
              <div className='flex gap-x-5 z-20'>
                <Calendar
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  handleDateChange={handleDateChange}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </div>
    
              <div className='flex gap-x-3'>
                <p className='font-medium text-lg'>{switchEnabled ? 'Turnos Habilitados' : 'Turnos Deshabilitados'}</p>
                <Switch
                  checked={switchEnabled}
                  onChange={async () => {
                    if (switchEnabled) {
                      deshabilitarTodoLosTurnos(); // Deshabilitar los turnos
                    } else {
                      habilitarTodosLosTurnos();
                    }
                    setSwitchEnabled(!switchEnabled);
                  }}
                  onColor="#1C1B1E"
                  offColor="#1C1B1E"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onHandleColor='#F2AF29'
                  offHandleColor="#837e7e"
                />
              </div>
            </div>
          </article>
        </section>

        <section>
          {
            horarios.length !== 0 ? (
              <article className='flex flex-col gap-x-12'>
                <div className='w-full flex flex-col md:flex-row'>
                  <div className='w-full md:w-[20%] flex justify-center md:flex-col text-blancoSecundario'>
                    <button
                      onClick={() => setPeriodoHorario('mañana')}
                      className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'mañana' ? 'font-semibold border-b-[5px] md:border-l-[5px] md:border-b-0 border-amarilloSecundario' : 'font-light'}`}
                    >
                      Mañana
                    </button>
                    <button
                      onClick={() => setPeriodoHorario('tarde')}
                      className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'tarde' ? 'font-semibold border-b-[5px] md:border-l-[5px] md:border-b-0 border-amarilloSecundario' : 'font-light'}`}
                    >
                      Tarde
                    </button>
                  </div>
                  <div className=' w-full flex  my-5 flex-col justify-start h-[200px] overflow-y-auto '>
                    <div className='w-[92%] sm:w-[70%] lg:w-[80%] xl:px-10  mx-auto 
                 grid grid-cols-2 place-items-center sm:grid-cols-3 
                 gap-y-3 xl:gap-2 h-[184px] pb-2 md:py-4 '>
                      {
                        filtarHorariosPorPeriodo?.map((horario, i) => (
                          <Horario
                            key={i}
                            horario={horario}
                            horariosModificados={horariosModificados}
                            setHorariosModificados={setHorariosModificados}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='flex justify-center '>
                  {
                    isLoading && <PantallaCargando isLoading={isLoading} />
                  }
                  <button
                    onClick={horariosModificados.length !== 0 ? () => guardarCambios() : null}
                    className={`
                    ${horariosModificados.length !== 0 ? 'bg-amarillo text-negroPrincipal' : 'bg-gray-400'} 
                    px-3 py-2 rounded-lg font-semibold
                    `}>
                    Guardar cambios
                  </button>
                </div>
              </article>
            ) : (
              <article className='h-[150px] flex justify-center'>
                <p className='text-2xl text-[#1e1e1e] text-center'>No hay turnos para este día</p>
              </article>
            )
          }
        </section>
      </main>
  </>
  )
}
