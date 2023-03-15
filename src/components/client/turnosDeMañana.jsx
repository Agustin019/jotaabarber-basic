import { useEffect } from 'react'
import { dias_Hoy_Y_Mañana } from '../../utils/maxDiasLaborales'
import { ClipLoader } from 'react-spinners'

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
      <h2 className='text-slate-800 text-lg text-center font-medium py-1 uppercase'>¡Turnos de Mañana!</h2>
      {/*<ClipLoader/>*/}
    </div>
  )
}
