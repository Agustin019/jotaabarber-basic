import { Link } from 'react-router-dom'
import TurnoActivo from '../../components/client/cuenta/turnoActivo'
import Navbar from '../../components/layout/navbar'
import { useAuth } from '../../context/authContext'
import Footer from '../../components/layout/footer'


export default function TurnosDeUsuario() {

    const { datosUsuarioActual } = useAuth()
    const { turnosActivos } = datosUsuarioActual

    return (
        <>
            <Navbar />
            <main className='flex flex-col md:flex-row mt-20 '>
                <section>
                    <article>
                        <h2 className='font-bold text-2xl p-8 text-blanco'>¡Bienvenido, {datosUsuarioActual?.fullName?.split(' ')[0]}!</h2>
                    </article>
                    <article className="flex md:flex-col gap-x-4 justify-center px-5">
                        <Link
                            to="/datos"
                            className={`
                            w-[164px] h-[52px] p-4 text-lg font-semibold text-blanco text-center
                            
                            ${location.pathname === '/datos'
                                    ? 'font-semibold border-b-[5px] md:border-b-0 md:border-l-[5px] border-amarillo  '
                                    : 'font-light'
                                }`}
                        >
                            Datos
                        </Link>
                        <Link
                            to="/turnos"
                            className={`
                            w-[164px] h-[52px] p-4 text-lg font-semibold text-center text-blanco box-border
                            ${location.pathname === '/turnos'
                                    ? 'font-semibold border-b-[5px] md:border-b-0 md:border-l-[5px] border-amarillo '
                                    : 'font-light'
                                }`}
                        >
                            Turnos
                        </Link>
                    </article>
                </section>
                <section className="flex flex-col gap-y-5 w-[100%] mx-auto">
                    <article className='flex items-start mx-auto lg:mx-0 mt-12 py-5 border-b border-gray-400 w-[90%] '>
                        <h2 className='font-bold text-2xl text-blanco'>Proximos turnos</h2>
                    </article>
                    <article className=''>
                        {
                            turnosActivos?.length
                                ? turnosActivos?.map((turno, i) =>
                                    <TurnoActivo
                                        key={i}
                                        turno={turno}
                                        datosUsuarioActual={datosUsuarioActual}
                                    />)

                                : <div className='flex flex-col  gap-y-8 '>

                                    <div className='flex flex-col gap-y-3 items-center'>
                                        <p className='text-neutral-500 font-medium text-sm  sm:text-lg py-8'>Aún no cuentas con turnos programados</p>
                                        <Link
                                            to='/nuevoturno'
                                            className='w-[209px] h-[48px] py-3 px-6 flex justify-center items-center bg-amarillo rounded-lg text-negroPrincipal font-bold text-base uppercase'
                                        >
                                            <ion-icon name="add-sharp"></ion-icon>
                                            Nuevo turno
                                        </Link>
                                    </div>
                                </div>
                        }
                    </article>
                </section>
            </main>
            <Footer />
        </>
    )
}
