import React from 'react'

export default function ResumenTurno() {
    return (
        <aside className='w-[483px] col-span-1  bg-[#1e1e1e] h-screen py-[32px] pr-[63px] pl-[40px]'>
            <h2 className='font-bold text-white pb-5 text-2xl'>Resúmen de turno</h2>
            <div className='flex flex-col gap-y-4'>
                <p className='font-medium text-xl text-white '>Datos del cliente:</p>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex justify-between items-center'>
                        <p className='font-normal text-lg text-white'>Nombre</p>
                        <p className='font-light text-lg text-white'>Agustin Narciande</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-normal text-lg text-white'>Teléfono</p>
                        <p className='font-light text-lg text-white'>2236338023</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 '>
                    <p className='font-medium text-xl text-white '>Servicio</p>
                    <div className='flex justify-start items-center'>
                        <img
                            src="https://i.ibb.co/fYB2jhG/corte-barba.png"
                            alt="Imagen del servicio seleccionado"
                            className='w-[66px] h-[90px] rounded-lg'
                        />
                        <div className='px-5'>
                            <p className='font-bold text-xl text-white'>Corte y barba</p>
                            <p className='font-bold text-lg text-white'>$1233</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 '>
                    <p className='font-medium text-xl text-white '>Profesional</p>
                    <div className='flex justify-start items-center'>
                        <img
                            src="https://i.ibb.co/ZWZzjsT/lean.jpg"
                            alt="Imagen del servicio seleccionado"
                            className='w-[66px] h-[90px] rounded-lg'
                        />
                        <p className='font-bold text-xl text-white px-5'>Lean</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2 '>
                    <p className='font-medium text-xl text-white '>Datos del turno</p>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Dia </p>
                            <p className='font-light text-lg text-white'>20/05</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Horario</p>
                            <p className='font-light text-lg text-white'>14:00hs</p>
                        </div>
                        <div className='w-full border border-[#F2F2F2]'></div>
                        <div className='flex justify-between items-center'>
                            <p className='font-medium text-xl text-[#F2F2F2]'>Total</p>
                            <p className='font-bold text-xl text-[#F2F2F2]'>$1500.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
