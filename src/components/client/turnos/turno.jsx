import React from 'react'
import format from 'date-fns/format';

export default function Turno({ turno, setFechaSeleccionada, selectedDay }) {
    const fechaFormateada = format(selectedDay, 'dd-MM');
    return (
        <div
            onClick={() => setFechaSeleccionada({
                dia: fechaFormateada,
                hora: turno.hora
            })}
            className={`
                h-[45px] w-[177px] flex justify-between items-center gap-3 px-2 py-3 border border-l-[5px]
                ${!turno.disponible ? 'text-gray-400 border-gray-400' : 'border-black text-black'}
                border border-l-[5px] border-black
            `}
        >
            <p className='text-sm font-normal'>{turno.hora}</p>
            <p></p>
        </div>
    )
}
