import React from 'react'

export default function Turno({ turno }) {

    const { hora, cliente, servicio } = turno;
    return (
        <div className=' flex flex-col gap-y-5 items-center my-4'>
            <div className='w-3/4 rounded-sm mx-auto flex justify-around py-5 bg-white shadow-md'>
                <p>{hora}</p>
                <p>{cliente}</p>
                <p>{servicio}</p>
            </div>
        </div>

    )
}
