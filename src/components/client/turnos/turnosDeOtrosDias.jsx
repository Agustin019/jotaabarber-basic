import { useState, useEffect } from "react"
import Calendar from "../../utils/calendar"
import moment from "moment"

export default function TurnosDeOtrosDias({
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
      <div className='w-full flex flex-col justify-center items-center  gap-y-4'>
        <h2 className='text-slate-800 uppercase text-lg text-center font-medium py-1'>¡Selecciona el dia!</h2>
        <Calendar
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          setFecha={setFecha}
        />
        <h2 className='text-center text-md text-slate-400 font-medium py-1'>Turnos del dia: <span>{selectedDate.format('DD[/]MM')}</span></h2>
      </div>
    </article>
  )
}
