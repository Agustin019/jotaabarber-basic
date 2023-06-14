import React from 'react'

export default function ResumenTurno({
    nombre,
    telefono,
    servicioSeleccionado,
    profesionalSeleccionado,
    fechaSeleccionada,
    resumen,
    handleResumen
}) {
    return (
        <>

            <aside
                className='
            w-full sm:w-[483px] col-span-1 right-0 bg-[#1e1e1e] h-screen py-[32px] pr-[63px] pl-[40px] hidden lg:block
      '>
                <div className='flex justify-between items-center mb-5'>
                    <h2 className='font-bold text-white text-2xl'>Resúmen de turno</h2>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <p className='font-medium text-xl text-white '>Datos del cliente:</p>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Nombre</p>
                            <p className='font-light text-lg text-white'>{nombre === '' ? '-' : nombre} </p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Teléfono</p>
                            <p className='font-light text-lg text-white'>{telefono === 0 ? '-' : telefono}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-xl text-white '>Servicio</p>
                        <div className='flex justify-start items-center'>
                            {
                                !servicioSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={servicioSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${servicioSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover'
                                    />
                            }
                            <div className='px-5'>
                                <p className='font-bold text-xl text-white'>{servicioSeleccionado.nombre ?? '-'}</p>
                                <p className='font-bold text-lg text-white'>{servicioSeleccionado.precio ? `$${servicioSeleccionado.precio}` : '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-xl text-white '>Profesional</p>
                        <div className='flex justify-start items-center'>
                            {
                                !profesionalSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={profesionalSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${profesionalSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover '
                                    />
                            }
                            <p className='font-bold text-xl text-white px-5'>{profesionalSeleccionado.nombre ?? '-'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 '>
                        <p className='font-medium text-xl text-white '>Datos del turno</p>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-lg text-white'>Dia </p>
                                <p className='font-light text-lg text-white'>{fechaSeleccionada?.dia ? fechaSeleccionada.dia : '-'}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-lg text-white'>Horario</p>
                                <p className='font-light text-lg text-white'>{fechaSeleccionada?.hora ? `${fechaSeleccionada.hora}hs` : '-'}</p>
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
            <aside
                className={`w-[90%] fixed bg-[#1e1e1e] h-screen py-[28px] pr-[56px] pl-[40px] block lg:hidden z-30
                transition-all duration-300 ease-in-out
                ${resumen ? 'right-0' : 'right-[-100%] '} 
    `}>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='font-bold text-white text-2xl'>Resúmen de turno</h2>
                    <button
                        onClick={handleResumen}
                        className='lg:hidden'>
                        <img src="https://i.ibb.co/DVsQG6m/close-1.png" alt="cerrar resumen" />
                    </button>
                </div>
                <div className='flex flex-col gap-y-7'>
                    <p className='font-medium text-xl text-white '>Datos del cliente:</p>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Nombre</p>
                            <p className='font-light text-lg text-white'>{nombre === '' ? '-' : nombre} </p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='font-normal text-lg text-white'>Teléfono</p>
                            <p className='font-light text-lg text-white'>{telefono === 0 ? '-' : telefono}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-xl text-white '>Servicio</p>
                        <div className='flex justify-start items-center'>
                            {
                                !servicioSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={servicioSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${servicioSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover'
                                    />
                            }
                            <div className='px-5'>
                                <p className='font-bold text-xl text-white'>{servicioSeleccionado.nombre ?? '-'}</p>
                                <p className='font-bold text-lg text-white'>{servicioSeleccionado.precio ? `$${servicioSeleccionado.precio}` : '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-xl text-white '>Profesional</p>
                        <div className='flex justify-start items-center'>
                            {
                                !profesionalSeleccionado?.img
                                    ? <div className='w-[66px] h-[90px] bg-gray-300 rounded-lg flex flex-col justify-center items-center'>
                                        <img src='https://i.ibb.co/YthSfQx/Vector.png' className='w-[15px] h-[15px]' alt='Sin foto del profesional' />
                                    </div>
                                    : <img
                                        src={profesionalSeleccionado.img ?? '-'}
                                        alt={`imagen del servicio${profesionalSeleccionado.nombre}`}
                                        className='w-[66px] h-[90px] rounded-lg object-cover '
                                    />
                            }
                            <p className='font-bold text-xl text-white px-5'>{profesionalSeleccionado.nombre ?? '-'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 '>
                        <p className='font-medium text-xl text-white '>Datos del turno</p>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-lg text-white'>Dia </p>
                                <p className='font-light text-lg text-white'>{fechaSeleccionada?.dia ? fechaSeleccionada.dia : '-'}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-lg text-white'>Horario</p>
                                <p className='font-light text-lg text-white'>{fechaSeleccionada?.hora ? `${fechaSeleccionada.hora}hs` : '-'}</p>
                            </div>
                            <div className='w-full border border-[#F2F2F2]'></div>
                            <div className='flex justify-between items-center'>
                                <p className='font-medium text-xl text-[#F2F2F2]'>Total</p>
                                <p className='font-bold text-xl text-[#F2F2F2]'>{servicioSeleccionado.precio ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
