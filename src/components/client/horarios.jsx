import React from 'react'
import HoraTurno from './horaTurno'

export default function Horarios({ horarios, setHora }) {
    return (
        <div className='w-full grid grid-cols-2 flex-col gap-3 '>
            {
                horarios.length
                    ? horarios.map(horaTurno => (
                        <HoraTurno key={horaTurno.hora} horaTurno={horaTurno} setHora={setHora} />
                    ))

                    : <p>No hay turnos para este dia</p>
            }
        </div>
    )
}
