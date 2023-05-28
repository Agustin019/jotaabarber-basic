import { Link } from 'react-router-dom'
import TurnoActivo from '../../components/client/cuenta/turnoActivo'
import Navbar from '../../components/layout/navbar'
import { useAuth } from '../../context/authContext'


export default function TurnosDeUsuario() {

    const { datosUsuarioActual } = useAuth()
    const { turnosActivos } = datosUsuarioActual

    return (
        <>
        <Navbar/>
            <article className='w-[90%] mx-auto'>
                <div className='flex items-start pb-5 border-b w-[80%] ml-[20%] border-gray-400 mt-20'>
                    <h2 className='font-bold text-2xl mt-20 '>Proximos turnos</h2>
                </div>
                <div className='ml-[20%] mx-auto'>
                    {
                        turnosActivos?.length
                            ? turnosActivos?.map((turno, i) =>
                                <TurnoActivo
                                    key={i}
                                    turno={turno}
                                    datosUsuarioActual={datosUsuarioActual}
                                />)
                    
                            : <div className='flex flex-col w-[90%]  mx-auto  gap-y-8'>
                                
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
                </div>
            </article>
        </>
    )
}
