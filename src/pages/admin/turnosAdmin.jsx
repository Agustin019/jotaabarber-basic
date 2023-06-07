import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Turno from '../../components/admin/turno';


export default function TurnosAdmin() {
    const [turnos, setTurnos] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());

    // Estado para manejar la apertura del calendario
    const [isOpen, setIsOpen] = useState(false);
    const fechaFormateada = format(selectedDay, 'dd-MM');
    console.log(fechaFormateada)


    const consultarTurnos = () => {
        const docRef = doc(db, 'Turnos', fechaFormateada)
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setTurnos(snapshot.data().turnos)
        })
        console.log(turnos)
        return () => {
            unsubscribe()
        }
    }



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

    return (
        <main className='ml-[250px] '>
            <section className='flex justify-start p-10 text-[#1e1e1e]'>
                <article className='flex flex-col gap-y-5'>
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
                <article className='w-full grid grid-cols-7 place-items-start px-10'>
                    <p className='font-normal text-base'>Cliente</p>
                    <p className='font-normal text-base'>Telefono</p>
                    <p className='font-normal text-base'>Hora</p>
                    <p className='font-normal text-base'>Servicio</p>
                    <p className='font-normal text-base'>Profesional</p>
                    <p className='font-normal text-base'>Estado</p>
                    <p className='font-normal text-base'>Cancelar</p>
                </article>
                <article>
                    {turnos.length !== 0 ? (
                        turnos.map((turno, index) => (
                           <Turno key={turno.id} turno={turno} index={index} /> 
                        ))
                    ) : (
                        <p>No hay turnos para este día aún</p>
                    )}
                </article>
            </section>
        </main>
    )
}
