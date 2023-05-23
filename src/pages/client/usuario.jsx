import React, { useState } from 'react'
import TurnosDeUsuario from '../../components/client/cuenta/turnosDeUsuario'
import DatosDeUsuario from '../../components/client/cuenta/datosDeUsuario'
import { useAuth } from '../../context/authContext'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/navbar'

export default function Usuario() {

    const [ switchUsuario, setSwitchUsuario ] = useState('turnos')

    const auth = useAuth()
    const { datosUsuarioActual } = auth
    const { turnosActivos } = datosUsuarioActual
    return (
        <>
        <Navbar/>
        <main className='w-[90%] mx-auto'>
            
            <section className='mt-40 grid grid-cols-[1fr,5fr]'>
                <article>
                    <div className='w-[20%] flex flex-col'>
                        <button
                            onClick={() => setSwitchUsuario('turnos')}
                            className={`w-[120px] h-[44px] py-3 px-2 text-base ${switchUsuario === 'turnos' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                            Turnos
                        </button>
                        <button
                            onClick={() => setSwitchUsuario('datos')}
                            className={`w-[120px] h-[44px] py-3 px-2 text-base ${switchUsuario === 'datos' ? 'font-semibold border-l-[5px] border-black' : 'font-light'}`}>
                            Datos
                        </button>
                    </div>
                </article>
                {
                    switchUsuario === 'turnos'
                    ? <TurnosDeUsuario turnosActivos={turnosActivos} datosUsuarioActual={datosUsuarioActual}/>
                    : <DatosDeUsuario datosUsuarioActual={datosUsuarioActual}/>
                }
            </section>
        </main>
        </>
    )
}
