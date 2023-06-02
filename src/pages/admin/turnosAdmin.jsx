import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';


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
                    <div className='flex items-center gap-x-2 '>
                        <p className='text-[20px] font-semibold'>{fechaFormateada}</p>
                        <p>cambiar dia</p>
                        <Calendar
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            handleDateChange={handleDateChange}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </article>
            </section>
            <section>
                <article className='w-full grid grid-cols-5 place-items-start px-10'>
                    <p className='font-normal text-base'>Cliente</p>
                    <p className='font-normal text-base'>Telefono</p>
                    <p className='font-normal text-base'>Hora</p>
                    <p className='font-normal text-base'>Servicio</p>
                    <p className='font-normal text-base'>Profesional</p>
                </article>
                <article>
                    {turnos.length !== 0 ? (
                        turnos.map((turno, index) => (
                            <div
                                key={turno.id}
                                className={`grid grid-cols-5 place-items-start py-4 px-10 text-[#2d2d2d] ${index % 2 === 0 ? 'bg-white' : 'bg-[#2d2d2d]/10'
                                    }`}
                            >
                                <p className='font-light text-sm'>{turno.cliente}</p>
                                <div className='flex items-center gap-x-1 underline'>
                                    <ion-icon name="logo-whatsapp"></ion-icon>
                                    <a href={`https://wa.me/${turno.telefono}`} className='font-medium text-sm'>{turno.telefono}</a>
                                </div>
                                <p className='font-light text-sm'>{turno.hora}</p>
                                <p className='font-light text-sm'>{turno.servicio}</p>
                                <p className='font-light text-sm'>{turno.profesional}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay turnos para este día aún</p>
                    )}
                </article>
            </section>
        </main>
    )
}
