import { useState, useEffect } from "react"
import Calendar from "../calendar"
import Horarios from "./horarios"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from "../../utils/firebaseconfig"
import moment from "moment"

export default function TurnosDeOtrosDias({
  fecha,
  setFecha,
  setLoading,
}) {
  
  //const [horarios, setHorarios] = useState([])
  const [selectedDate, handleDateChange] = useState(moment())

  useEffect(() => {
    setLoading(true)
    const fechaFormateada = selectedDate.format('DD-MM');
    setFecha(fechaFormateada)
    setLoading(false)    
  }, [])
 
  return (
    <article>
      <div className='w-full flex flex-col justify-center items-center  gap-y-10'>
        <h2 className='text-teal-400 text-xl text-center font-semibold py-4'>Seleccionar dia</h2>
        <Calendar
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          setFecha={setFecha}
        />
        <h2 className='text-center text-xl text-teal-500 font-medium py-3'>Turnos del dia: {selectedDate.format('DD [/] MMMM')}</h2>
        {/*!loading && <Horarios horarios={horarios} setHora={setHora} />*/}
        {/* { horarios !== null && <Horarios horarios={horarios} setHora={setHora} />}  */}
      </div>
    </article>
  )
}
