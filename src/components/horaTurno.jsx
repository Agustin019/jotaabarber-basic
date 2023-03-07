import React from 'react'
import { Link } from 'react-scroll';

export default function HoraTurno({ horaTurno, setHora }) {
    console.log(horaTurno)
    const { hora, disponible } = horaTurno;
    return (
        <div className='flex justify-between py-5 px-2 bg-white shadow-md rounded-md' >
            <div className={`${disponible ? 'text-green-600': 'text-gray-400'} flex items-center gap-x-2 border-r-2 border-gray-300 px-4`}>
                <ion-icon name="time-outline"></ion-icon>
                <p className='font-medium'>{hora}</p>
            </div>
            <input 
                type="button" 
                value="¡Reservar!"
                onClick={ disponible ? () => {setHora(hora) } : null }
                className={`${disponible ? 'bg-green-500 cursor-pointer' : 'bg-slate-400'} py-2 px-3 font-semibold text-base text-white rounded-md`}
                />
        </div>
    )
}
