import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebaseconfig'
import { Transition } from '@headlessui/react';
import Alerta from '../../utils/alerta'
import { useEffect, useState } from 'react'

export default function TurnoActivo({ turno, datosUsuarioActual }) {

    const [modal, setModal] = useState(false)
    const handleModal = () => {
        setModal(!modal)
    }
    console.log(turno.turnoId)

    const cancelarTurno = async () => {
        // Eliminando el turno activo en el documento del usuario
        // const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid);
        // const docUser = await getDoc(docRefUser);
        // const turnosActivos = docUser.data().turnosActivos;
        // const turnosActivosActualizados = turnosActivos.filter(turnoActivo => turnoActivo.id !== turno.id);

        // await updateDoc(docRefUser, {
        //     turnosActivos: turnosActivosActualizados
        // });

        // console.log('Turno Activo del cliente eliminado')
        const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid)
        const docUser = await getDoc(docRefUser)
        const turnosActivos = docUser.data().turnosActivos;

        const encontrarTurnoUsuario = turnosActivos.findIndex(obj => obj.turnoId === turno.turnoId)
        if (encontrarTurnoUsuario !== -1) {
            turnosActivos[encontrarTurnoUsuario] = {
                ...turnosActivos[encontrarTurnoUsuario],
                estado: 'cancelado'
            };
        }
        await updateDoc(docRefUser, { turnosActivos })

        console.log('Estado del turnno cliente actualizado')


        // Cambiamos la disponibilidad del turno para que este disponible nuevamente
        const docRefHoras = doc(db, 'horarios', turno.dia)
        const horaFirebase = await getDoc(docRefHoras)
        const horas = horaFirebase.data()

        const encontrarHora = horas.horariosLaborales.findIndex(obj => obj.hora === turno.hora)
        if (encontrarHora !== -1) {
            horas.horariosLaborales[encontrarHora] = {
                ...horas.horariosLaborales[encontrarHora],
                disponible: true
            };
        }
        await updateDoc(docRefHoras, horas)
        console.log('Horario disponible para todo el publico')


        // Cambiando el estado del turno en el panel del admin
        const docRefTurno = doc(db, 'Turnos', turno.dia)
        const docTurno = await getDoc(docRefTurno)
        const turnos = docTurno.data()

        const encontrarTUrno = turnos.turnos.findIndex(obj => obj.turnoId === turno.turnoId)
        if (encontrarTUrno !== -1) {
            turnos.turnos[encontrarTUrno] = {
                ...turnos.turnos[encontrarTUrno],
                estado: 'cancelado'
            };
        }
        await updateDoc(docRefTurno, turnos)
        handleModal()
        console.log('Estado de turno actualizado')
        window.location.reload();
    }

    useEffect(() => {
        const eliminarTurnosViejos = async () => {
            const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid);
            const docUser = await getDoc(docRefUser);
            const turnosActivos = docUser.data().turnosActivos;
            const fechaTurno = turno.objetoDiaSeleccionado.toDate(); // Suponiendo que la fecha está almacenada como un objeto de fecha en Firestore

            const fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para comparar solo las fechas

            const fechaTurnoSinHora = new Date(fechaTurno);
            fechaTurnoSinHora.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero para comparar solo las fechas

            if (fechaTurnoSinHora < fechaActual) {
                const turnosActivosActualizados = turnosActivos.filter(
                    turnoActivo => turnoActivo.id !== turno.id
                );

                await updateDoc(docRefUser, {
                    turnosActivos: turnosActivosActualizados
                });
            }
        };

        eliminarTurnosViejos();
    }, []);




    return (
        <>
            {modal &&
                <Transition show={modal}>
                    <Alerta
                        titulo={'Cancelar reserva'}
                        texto={`¿Estás seguro de cancelar la reserva? Podras solicitar otra reserva cuando gústes.`}
                        txtBtnCancelar={'No, conservar.'}
                        txtBtnConfirmar={'Si, cancelar.'}
                        cancelar={handleModal}
                        confirmar={cancelarTurno}
                    />
                </Transition>

            }
            <div className=' grid grid-cols-2 mx-auto lg:mx-0 w-[328px] lg:w-[923px] lg:flex justify-between rounded-lg bg-negroSecundario my-8 '>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-blancoSecundario text-sm font-semibold'>Usuario</p>
                    <p className='text-blancoSecundario text-sm font-normal'>{datosUsuarioActual.fullName}</p>
                    <p className='text-blancoSecundario text-sm font-normal'>+54 {turno.telefono}</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-blancoSecundario text-sm font-semibold'>Dia y horario</p>
                    <p className='text-blancoSecundario text-sm font-normal'>{`${turno.nombreDia} - ${turno.dia}`} <br /> {turno.hora} hs</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-blancoSecundario text-sm font-semibold'>Servicio</p>
                    <p className='text-blancoSecundario text-sm font-normal'>{turno.servicio}</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-blancoSecundario text-sm font-semibold'>Estado</p>
                    {
                        turno.estado === 'confirmado'
                            ? <p className='text-blancoSecundario text-sm font-semibold p-[10px] bg-verde rounded-xl'>Confirmado</p>
                            : <p className='text-blancoSecundario text-sm font-semibold p-[10px] bg-rojo rounded-xl'>Cancelado</p>
                    }
                </div>
                <div className='flex  justify-end items-end py-5  lg:py-0 md:pr-0 col-span-2'>
                    {
                        turno.estado === 'confirmado'
                            ? <button
                                type='button'
                                onClick={handleModal}
                                className='lg:w-[40px] mx-5 lg:mx-0 w-full lg:h-full bg-rojo rounded-lg lg:rounded-none lg:rounded-r-lg  flex lg:flex-col justify-center  items-center '
                            >
                                <img
                                    src="https://i.ibb.co/B2KNRy3/delete-4.png"
                                    alt="icono eliminar"
                                    className='p-2 cursor-pointer '    
                                    />
                                <span className='font-semibold lg:hidden text-blancoSecundario'>
                                Cancelar reserva
                                </span>
                            </button>

                            :''
                }

                </div>
            </div>
        </>
    )
}
