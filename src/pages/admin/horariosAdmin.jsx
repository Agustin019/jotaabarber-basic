import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';
import Horario from '../../components/admin/horario';

export default function HorariosAdmin() {
    const [horarios, setHorarios] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());

    const [periodoHorario, setPeriodoHorario] = useState('mañana')
    const filtarHorariosPorPeriodo = horarios.filter(horario => horario.periodo === periodoHorario)


    // Estado para manejar la apertura del calendario
    const [isOpen, setIsOpen] = useState(false);
    const fechaFormateada = format(selectedDay, 'dd-MM');
    console.log(fechaFormateada)


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
    }, [selectedDay]);

    useEffect(() => {
        consultarHorarios();
    }, []); // Llamar al cargar el componente

    const handleDateChange = (date) => {
        setSelectedDay(date);
        setIsOpen(!isOpen);
    }

    return (
        <main className='ml-[250px] p-10 flex flex-col gap-y-7'>
            <section>
                <article className=' flex flex-col gap-y-5 items-start '>
                    <h1 className='font-semibold text-2xl'>Horarios</h1>
                    <p className='font-ligh text-lg'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                </article>
                <article className=' flex flex-col gap-y-5 items-start mt-10'>
                    <h2 className='font-semibold text-xl'>Agenda del dia {''}</h2>
                    <div className='flex justify-between w-full'>
                        <div className='flex gap-x-5'>
                            <h2 className='font-semibold text-xl'>{fechaFormateada}</h2>
                            <Calendar
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                                handleDateChange={handleDateChange}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        </div>

                        <h2>Turnos on</h2>
                    </div>
                </article>
            </section>
            <section>
                {
                    horarios.length !== 0
                        ? <article className='flex'>
                            <div className='w-[20%] flex flex-col'>
                                <button
                                    onClick={() => setPeriodoHorario('mañana')}
                                    className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'mañana' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                                    Mañana
                                </button>
                                <button
                                    onClick={() => setPeriodoHorario('tarde')}
                                    className={`w-[120px] h-[44px] py-3 px-2 text-base ${periodoHorario === 'tarde' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                                    Tarde
                                </button>
                            </div>
                            :


                            <div className='w-[90%] flex flex-wrap gap-5  overflow-y-auto'>
                                {
                                    filtarHorariosPorPeriodo?.map((horario, i) => <Horario key={i} horario={horario}/>)
                                }
                            </div>
                        </article>


                        : <article className=' h-[150px] flex justify-center'>
                            <p className='text-2xl text-[#1e1e1e] text-center '>No hay turnos para este dia</p>
                        </article>

                }

            </section>
        </main>
    )
}
