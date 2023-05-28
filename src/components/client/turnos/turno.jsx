import React from 'react'
import format from 'date-fns/format';

export default function Turno({
    turno,
    fechaSeleccionada,
    setFechaSeleccionada,
    selectedDay,
    diaAbreviado,
    objetoDiaSeleccionado
}) {
    const fechaFormateada = format(selectedDay, 'dd-MM');
    return (
        <div
            onClick={
                !turno.disponible
                    ? null

                    : () => setFechaSeleccionada({
                        dia: fechaFormateada,
                        hora: turno.hora,
                        nombreDia: diaAbreviado,
                        objetoDiaSeleccionado: objetoDiaSeleccionado,
                        id: turno.id
                    })
                }
            className={`
                h-[45px] w-[177px] flex justify-between items-center gap-3 px-2 py-3 border border-l-[5px]
                ${!turno.disponible ? 'text-gray-400 border-gray-400' : 'border-black text-black'}
                border border-l-[5px] border-black
            `}
        >
            <p className='text-sm font-normal'>{turno.hora}</p>
            <p className='text-xl'>{turno.id === fechaSeleccionada.id ? <ion-icon name="checkmark-circle-sharp"></ion-icon> : ''}</p>
        </div>
    )
}
