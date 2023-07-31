import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, getDoc, updateDoc  } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Turno from '../../components/admin/turno';
import DashBoard from '../../components/admin/dashBoard';
import ModalDatosDelTurno from '../../components/admin/modalDatosDelTurno';
import PantallaCargando from '../../components/utils/pantallaCargando'

import { toast } from 'react-toastify'

export default function TurnosAdmin() {
    const [turnos, setTurnos] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [turnoACancelar, setTurnoACancelar ] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    console.log(turnoACancelar)

    // Modal para ver los datos del turno
    const [ modalDatosDeTurno, setModalDatosDeTurno  ] = useState({})

    // Modal para xancelar el turno
    const [modal, setModal] = useState(false)
    const [modalEliminarTurno, setModalEliminarTurno] = useState(false)
    const handleModal = () => {
        setModal(!modal)
    }
    // Estado para manejar la apertura del calendario
    const [isOpen, setIsOpen] = useState(false);
    const fechaFormateada = format(selectedDay, 'dd-MM');
    console.log(fechaFormateada)


    const consultarTurnos = () => {
        const docRef = doc(db, 'Turnos', fechaFormateada)
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            // Obtener los datos del documento
            const datosDelDocumento = snapshot.data().turnos;
            // Ordenar los turnos por la hora utilizando la función compararHoras
            const turnosOrdenados = datosDelDocumento.sort(compararHoras);
            // Actualizar el estado con los turnos ordenados
            setTurnos(turnosOrdenados);
        });
        console.log(turnos)
        return () => {
            unsubscribe()
        }
    }
    // Función para comparar las horas y ordenar el arreglo
    const compararHoras = (a, b) => {
        const horaA = a.hora;
        const horaB = b.hora;
        return horaA.localeCompare(horaB, 'es', { numeric: true });
    };


    useEffect(() => {
        consultarTurnos();
        console.log(turnos)
    }, [selectedDay]);

    useEffect(() => {
        consultarTurnos();
    }, []); // Llamar al cargar el componente


    const handleDateChange = (date) => {
        setSelectedDay(date);
        setIsOpen(!isOpen);
    }

    const cancelarTurno = async () => {
        try {
            setIsLoading(true);
            // Eliminando el turno activo en el documento del usuario
            const docRefUser = doc(db, 'usuarios', turnoACancelar.userId);
            const docUser = await getDoc(docRefUser);
            const turnosActivos = docUser.data().turnosActivos;
            const turnosActivosActualizados = turnosActivos.filter(
                turnoActivo => turnoActivo.turnoId !== turnoACancelar.turnoId
            );
    
            await updateDoc(docRefUser, {
                turnosActivos: turnosActivosActualizados
            });
    
            console.log('Turno Activo del cliente eliminado');
    
            // Cambiamos la disponibilidad del turno para que esté disponible nuevamente
            const docRefHoras = doc(db, 'horarios', turnoACancelar.dia)
            const horaFirebase = await getDoc(docRefHoras)
            const horas = horaFirebase.data()
    
            const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === turnoACancelar.hora)
            if (encontrarHora !== -1) {
                horas.horariosLaborales[encontrarHora] = {
                    ...horas.horariosLaborales[encontrarHora],
                    disponible: true
                };
            }
            await updateDoc(docRefHoras, horas)
            console.log('Horario disponible para todo el público');
    
            // Cambiar estado a cancelado en admin
            const docRefTurno = doc(db, 'Turnos', turnoACancelar.dia)
            const docTurno = await getDoc(docRefTurno)
            const turnos = docTurno.data()
            console.log(turnoACancelar.turnoId)
            const encontrarTurno = turnos.turnos.findIndex(obj => obj.turnoId === turnoACancelar.turnoId)
            console.log(turnos)
            console.log(encontrarTurno)
    
            turnos.turnos[encontrarTurno] = {
                ...turnos.turnos[encontrarTurno],
                estado: 'cancelado'
            };
    
            await updateDoc(docRefTurno, turnos)
            console.log('Estado de turno actualizado');
            handleModal();
            setModalDatosDeTurno({});
            setIsLoading(false);
            toast.success('Turno cancelado correctamente!')
        } catch (error) {
            toast.error("Ups, algo salio mal.", "error")
            setIsLoading(false); // Asegurarnos de que se restablezca el estado de isLoading en caso de error.
        }
    };

    const eliminarTurno = async () => {
        setIsLoading(true)
        try {
            const docRefUser = doc(db, 'Turnos', turnoACancelar.dia);
            const docUser = await getDoc(docRefUser);
            const turnos = docUser.data();
            console.log('Valor de turnos:', turnos);
    
            const turnosActualizados = turnos.turnos.filter(
                turnoActivo => turnoActivo.turnoId !== turnoACancelar.turnoId
            );
            console.log('Valor de turnosActualizados:', turnosActualizados);
    
            await updateDoc(docRefUser, {
                turnos: turnosActualizados
            });
            
            setModalEliminarTurno(!modalEliminarTurno);
            setModalDatosDeTurno({});
            setIsLoading(false)
            toast.success('Turno eliminado correctamente!')
        } catch (error) {
            toast.error("Ups, algo salio mal.", "error")
            setIsLoading(false);
            console.log(error)
        }
    };
    

    return (
        <>
            <DashBoard />
            <main className='lg:ml-[250px] bg-negroSecundario min-h-screen'>
            <PantallaCargando isLoading={isLoading} />
            {
            Object.keys(modalDatosDeTurno).length !== 0  && 
            <ModalDatosDelTurno 
                modalDatosDeTurno={modalDatosDeTurno} 
                setModalDatosDeTurno={setModalDatosDeTurno} 
                handleModal={handleModal}
                cancelarTurno={cancelarTurno}
                setTurnoACancelar={setTurnoACancelar}
                modalEliminarTurno={modalEliminarTurno}
                setModalEliminarTurno={setModalEliminarTurno}
                /> 
            }
                <section className='flex justify-start p-10 text-blancoSecundario '>
                    <article className='flex flex-col gap-y-5 z-20'>
                        <h2 className='text-2xl font-semibold'>Agenda del dia</h2>
                        <Calendar
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            handleDateChange={handleDateChange}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </article>
                </section>
                <section>

                    <article className=' text-blancoSecundario font-OpenSans
                     grid grid-cols-[3fr,3fr,1fr,1fr]  
                     sm:grid-cols-[2fr,2fr,2fr,1fr]
                     md:grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr,1fr]
                     lg:grid-cols-7 
                     place-items-start  px-2 xl:px-10 text-sm xl:text-base '
                    >
                        <p className='font-normal '>Cliente</p>
                        <p className='font-normal '>Telefono</p>
                        <p className='font-normal '>Hora</p>
                        <p className='font-normal hidden md:block'>Servicio</p>
                        <p className='font-normal hidden md:block'>Reservado el</p>
                        <p className='font-normal hidden md:block'>Estado</p>
                        <p className='font-normal hidden md:block'>Cancelar</p>
                        <p className='font-normal md:hidden block place-items-end place-self-end'> más</p>
                    </article>
                    <article>
                        {turnos.length !== 0 ? (
                            turnos.map((turno, index) => (
                                <Turno 
                                key={turno.turnoId} 
                                index={index}
                                turno={turno}
                                setTurnoACancelar={setTurnoACancelar} 
                                modal={modal}
                                cancelarTurno={cancelarTurno}
                                handleModal={handleModal}
                                setModalDatosDeTurno={setModalDatosDeTurno}
                                modalEliminarTurno={modalEliminarTurno}
                                setModalEliminarTurno={setModalEliminarTurno}
                                eliminarTurno={eliminarTurno}
                                />
                            ))
                        ) : (
                            <p className='text-center pt-20 text-lg text-blanco font-OpenSans'>No hay turnos para este día aún</p>
                        )}
                    </article>
                </section>
            </main>
        </>
    )
}
