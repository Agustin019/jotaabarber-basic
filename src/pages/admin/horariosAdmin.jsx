import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Calendar from '../../components/utils/calendar';

export default function HorariosAdmin() {
    const [horarios, setHorarios] = useState([])
    const [selectedDay, setSelectedDay] = useState(new Date());

    // Estado para manejar la apertura del calendario
    const [isOpen, setIsOpen] = useState(false);
    const fechaFormateada = format(selectedDay, 'dd-MM');
    console.log(fechaFormateada)


    const consultarHorarios = () => {
        const docRef = doc(db, 'horarios', fechaFormateada)
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setHorarios(snapshot.data().horarios)
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
    <main className='ml-[250px] p-10'>
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
    </main>
  )
}
