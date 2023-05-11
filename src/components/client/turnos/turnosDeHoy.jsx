import { useEffect } from 'react'

import { dias_Hoy_Y_Mañana } from '../../../utils/maxDiasLaborales'

export default function TurnosDeHoy({  setLoading, setFecha, }) {
  const diaActual = dias_Hoy_Y_Mañana[0]
  useEffect(() => {
    setLoading(true)
     setFecha(diaActual)
    setLoading(false)
  }, [])

    return (
    <div>
      <h2 className='text-slate-800 text-lg text-center font-medium py-1 uppercase'>¡Turnos de hoy!</h2>
    </div>
  )
}
