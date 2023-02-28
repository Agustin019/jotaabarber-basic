import React from 'react'

export default function Turno({ turno }) {

    const { hora, cliente, servicio } = turno;
    return (
        <div className='w-3/4 rounded-sm mx-auto flex justify-around py-5 bg-white shadow-md'>
            <p>{hora}</p>
            <p>{cliente}</p>
            <p>{servicio}</p>
        </div>
    )
}
