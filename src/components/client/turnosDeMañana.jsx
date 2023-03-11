import { useEffect, useState } from 'react'
import { db } from '../../utils/firebaseconfig'
import { doc, onSnapshot } from 'firebase/firestore'
import { dias_Hoy_Y_Mañana } from '../../utils/maxDiasLaborales'
import Horarios from './horarios'
export default function TurnosDeMañana({  setLoading,  setFecha,  }) {

  // const [ horarios, setHorarios ] = useState()
  const diaDeMañana = dias_Hoy_Y_Mañana[1]
  useEffect(() => {
    setLoading(true) 
    setFecha(diaDeMañana)
    setLoading(false)

  }, [])
  return (
    <div>
      <h2 className='text-teal-400 text-xl text-center font-semibold py-4'>Turnos de Mañana</h2>
      {/* { horarios !== null && <Horarios horarios={horarios} setHora={setHora} />}  */}
      {/*!loading ? <Horarios horarios={horarios} setHora={setHora} /> : ''*/}
    </div>
  )
}
