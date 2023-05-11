import React from 'react'

export default function HoraTurno({ horaTurno, setHora, setModal }) {
    const { hora, disponible } = horaTurno;
    return (
        <div className='flex justify-between py-2 px-2 bg-white shadow-md rounded-md ' >
            <div className={`${disponible ? 'text-green-600' : 'text-gray-400'} flex items-center  `}>
                <ion-icon name="time-outline"></ion-icon>
                <p className='font-medium'>{hora}</p>
            </div>
                <input
                    type="button"
                    value={disponible ? '¡Reservar!' : 'Reservado'}
                    onClick={disponible ? () =>  {setHora(hora), setModal(true) }  : null}
                    className={`py-1 px-[2px] sm:px-2 font-medium text-base text-white rounded-md
                    ${disponible 
                    ? 'bg-green-500 cursor-pointer' 
                    : 'bg-slate-400'}`}
                />
        </div>
    )
}
