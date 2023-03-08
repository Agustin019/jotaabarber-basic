import { dias_Hoy_Y_Mañana } from '../../utils/maxDiasLaborales'
export default function TurnosDeHoy() {

  const diaActual = dias_Hoy_Y_Mañana[0]
  console.log(diaActual)
  return (
    <div>TurnosDeHoy</div>
  )
}
