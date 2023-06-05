import React from 'react'

export default function Horario({horario}) {
    return (
        <div
            className={`
                h-[45px] w-[177px] flex justify-between items-center gap-3 px-2 py-3 border border-l-[5px]
                border-black text-black
                border border-l-[5px] 
            `}
        >
            <p className='text-sm font-normal'>{horario.hora}</p>
            <p className='text-xl'>{/*horario.id === fechaSeleccionada.id ? <ion-icon name="checkmark-circle-sharp"></ion-icon> : ''*/}</p>
        </div>
    )
}
