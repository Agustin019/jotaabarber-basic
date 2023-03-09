import { useState, useEffect } from "react"
import Calendar from "../calendar"
import Horarios from "./horarios"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from "../../utils/firebaseconfig"
import moment from "moment"

export default function TurnosDeOtrosDias({
  fecha,
  setFecha,
  loading,
  setLoading,
  setHora,
  selectedDate,
  handleDateChange
}) {

  
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
   // const fechaFormateada = selectedDate.format('DD-MM');
    setLoading(true)
      //const unsub = onSnapshot(doc(db, "horarios", fechaFormateada), (doc) => {
      const unsub = onSnapshot(doc(db, "horarios", fecha), (doc) => {
        const newData = doc.data().horariosLaborales
        setHorarios(newData)
      });
      setLoading(false)
      return () => {
        unsub();
      };
  }, [selectedDate])
 
  return (
    <article>
      <div className='w-full flex flex-col justify-center items-center  gap-y-10'>
        <h2 className='text-teal-400 text-xl text-center font-semibold py-4'>Seleccionar dia</h2>
        <Calendar
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          setHorarios={setHorarios}
          fecha={fecha}
          setFecha={setFecha}
          setLoading={setLoading}
        />
        <h2 className='text-center text-xl text-teal-500 font-medium py-3'>Turnos del dia: {selectedDate.format('DD [/] MM [/] YYYY')}</h2>
        {!loading && <Horarios horarios={horarios} setHora={setHora} />}
      </div>
    </article>
  )
}
