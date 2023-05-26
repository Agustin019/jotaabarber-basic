import { Link } from 'react-router-dom'
import TurnoActivo from './turnoActivo'


export default function TurnosDeUsuario({ turnosActivos, datosUsuarioActual }) {

    return (
        <article >
            <div className='flex items-start pb-5 border-b w-full border-gray-400'>
                <h2 className='font-bold text-2xl'>Proximos turnos</h2>
            </div>
            {
                turnosActivos?.length
                    ? turnosActivos?.map((turno, i) =>
                        <TurnoActivo
                            key={i}
                            turno={turno}
                            datosUsuarioActual={datosUsuarioActual}
                        />)

                    : <div className='flex flex-col  gap-y-8'>
                        
                        <div className='flex flex-col gap-y-10 items-center'>
                            <p className='text-neutral-500 font-medium text-lg py-8'>Aún no cuentas con turnos programados</p>
                            <Link
                                to='/nuevoturno'
                                className='w-[209px] h-[48px] py-3 px-6 flex justify-center items-center bg-black text-white font-bold text-base uppercase'
                            >
                                <ion-icon name="add-sharp"></ion-icon>
                                Nuevo turno
                            </Link>
                        </div>
                    </div>
            }
        </article>
    )
}
