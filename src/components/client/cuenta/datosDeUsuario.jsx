import React from 'react'

export default function DatosDeUsuario({ datosUsuarioActual }) {
    return (
        <article className='flex flex-col items-center gap-y-5 py-20 bg-neutral-900'>
            <img
                className='w-20'
                src="https://i.ibb.co/HCC2RSv/imgUser.png" alt="" />
            <h2 className='text-2xl font-bold text-center text-white'>Hola, <span className='text-green-600'>{datosUsuarioActual?.fullName?.split(' ')[0]}</span></h2>
            <p className='font-bold text-white text-xl'>¿Que te gustaria hacerte?</p>
        </article>
    )
}
