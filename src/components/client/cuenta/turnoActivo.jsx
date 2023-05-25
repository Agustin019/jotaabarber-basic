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

    const cancelarTurno = async () => {
        // Eliminando el turno activo en el documento del usuario
        const docRefUser = doc(db, 'usuarios', datosUsuarioActual.uid);
        const docUser = await getDoc(docRefUser);
        const turnosActivos = docUser.data().turnosActivos;
        const turnosActivosActualizados = turnosActivos.filter(turnoActivo => turnoActivo.id !== turno.id);

        await updateDoc(docRefUser, {
            turnosActivos: turnosActivosActualizados
        });

        console.log('Turno Activo del cliente eliminado')

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

        // Eliminando el turno en la coleccion 'Turnos' que es el que se le va a mostrar al admin
        const docRefTurno = doc(db, 'Turnos', turno.dia)
        const docTurno = await getDoc(docRefTurno)
        const turnos = docTurno.data().turnos
        const turnosActualidados = turnos.filter(turn => turn.id !== turno.id)
        await updateDoc(docRefTurno, {
            turnos: turnosActualidados
        });
        console.log('Turno eliminado de la base de datos')
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
            <div className='w-full flex justify-between h-[115px] rounded-lg bg-[#1e1e1e] my-8 '>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-white text-sm font-normal'>Usuario</p>
                    <p className='text-white text-sm font-light'>{datosUsuarioActual.fullName}</p>
                    <p className='text-white text-sm font-light'>+54 {turno.telefono}</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-white text-sm font-normal'>Dia y horario</p>
                    <p className='text-white text-sm font-light'>{`${turno.nombreDia} - ${turno.dia}`} <br /> {turno.hora} hs</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-white text-sm font-normal'>Servicio</p>
                    <p className='text-white text-sm font-light'>{turno.servicio}</p>
                </div>
                <div className='flex flex-col gap-y-2 p-[20px]'>
                    <p className='text-white text-sm font-normal'>Profesional</p>
                    <p className='text-white text-sm font-light'>{turno.profesional}</p>
                </div>

                <div
                    className='w-9 h-full bg-gray-300 rounded-r-lg  flex flex-col justify-center items-center '
                >
                    <img
                        src="https://i.ibb.co/6W6fcfJ/delete-1.png"
                        alt="icono eliminar"
                        className='p-2 cursor-pointer'
                        onClick={handleModal}
                    />
                </div>
            </div>
        </>
    )
}
