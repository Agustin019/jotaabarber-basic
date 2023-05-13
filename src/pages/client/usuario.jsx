import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'

export default function Usuario() {
    const auth = useAuth()
    const { datosUsuarioActual } = auth
    return (
        <main>
            <section>
                <article className='flex flex-col items-center gap-y-5 py-20 bg-neutral-900'>
                    <img 
                        className='w-20'
                        src="https://i.ibb.co/HCC2RSv/imgUser.png" alt="" />
                    <h2 className='text-2xl font-bold text-center text-white'>Hola, <span className='text-green-600'>{datosUsuarioActual?.fullName?.split(' ')[0]}</span></h2>
                    <p className='font-bold text-white text-xl'>¿Que te gustaria hacerte?</p>
                    <Link className='p-2 rounded-md bg-green-500 font-semibold text-white text-lg' to='/turnos'>Nuevo turno</Link>
                </article>
                <article className='w-[50%] mx-auto py-10 flex flex-col gap-y-8'>
                    <div className='flex justify-between '>
                        <h2 >Proximos turnos</h2>
                        <Link>Nuevo turno</Link>
                    </div>
                    <div className='border border-neutral-400 text-center p-2 rounded-md'>
                        <p className='text-neutral-500 font-medium text-lg'>No hay turnos reservados</p>
                    </div>
                </article>
            </section>
        </main>
    )
}
