import React from 'react'
import { Link } from 'react-scroll';


export default function HoraTurno({ horaTurno, setHora, scrollToElement }) {
    const { hora, disponible } = horaTurno;
    return (
        <div className='flex justify-between py-2 px-2 bg-white shadow-md rounded-md' >
            <div className={`${disponible ? 'text-green-600' : 'text-gray-400'} flex items-center gap-x-1 px-2`}>
                <ion-icon name="time-outline"></ion-icon>
                <p className='font-medium'>{hora}</p>
            </div>
            <Link to="elemento-id" smooth={true} duration={500}>
                <input
                    type="button"
                    value="¡Reservar!"
                    onClick={disponible ? () => { setHora(hora), scrollToElement } : null}
                    className={`${disponible ? 'bg-green-500 cursor-pointer' : 'bg-slate-400'} py-1 px-2 font-semibold text-base text-white rounded-md`}
                />
            </Link>
        </div>
    )
}
