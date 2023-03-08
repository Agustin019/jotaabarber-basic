import React from 'react'

export default function AdministrarTurno({ horas, cambiarEstadoDeTurno }) {

    const { hora, disponible } = horas
    return (
        <div className='w-[80%] mx-auto py-5 px-3 rounded-md shadow-sm flex justify-between'>
            <div className={`flex items-center gap-x-2 text-xl ${disponible ? 'text-green-500' : 'text-red-500'}`}>
                <ion-icon name="time-outline"></ion-icon>
                <p className='text-slate-600'>{hora}</p>
            </div>
            <div className='flex gap-x-4'>
                <input
                    className={`${disponible ? 'text-slate-300' : 'text-blue-500 cursor-pointer'}`}
                    type="button"
                    value="Habilitar"
                    onClick={
                        !disponible ? () => cambiarEstadoDeTurno(hora, disponible) : null 
                    } 
                />
                <input
                    className={`${!disponible ? 'text-slate-300 ' : 'text-blue-500 cursor-pointer'}`}
                    type="button"
                    value="Deshabilitar"
                    onClick={
                        disponible ? () => cambiarEstadoDeTurno(hora, disponible) : null 
                    }
                />
            </div>
        </div>
    )
}
