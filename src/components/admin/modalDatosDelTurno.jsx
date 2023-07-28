import React from 'react'

export default function ModalDatosDelTurno({
    modalDatosDeTurno,
    setModalDatosDeTurno,
    handleModal,
    setTurnoACancelar,
    modalEliminarTurno,
    setModalEliminarTurno
}) {

    const { cliente, telefono, hora, servicio, profesional, estado, fechaCreacion } = modalDatosDeTurno;


    const formatDate = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleString(); // Utilizar el método toLocaleString para formatear la fecha como desees
    };

    return (
        <div className='w-screen z-40 h-[100vh] top-0 bg-black/70  fixed flex flex-col justify-center items-center'>
            <div className='w-[328px]  mx-auto rounded-xl py-10 px-4 bg-negroPrincipal '>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-[22px] text-blanco'>Detalles del turno</h2>
                    <button onClick={() => setModalDatosDeTurno({})}>
                        <img className='w-[15px]' src="https://i.ibb.co/DVsQG6m/close-1.png" alt="Cerrar" />
                    </button>
                </div>
                <div className='flex flex-col gap-y-10 py-7'>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Cliente</h3>
                        <p className='text-sm font-normal'>{cliente}</p>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Telefono</h3>
                        <div className='flex items-center gap-x-1 underline'>
                            <ion-icon name="logo-whatsapp"></ion-icon>
                            <a href={`https://wa.me/${telefono}`} className='font-medium text-sm'>{telefono}</a>
                        </div>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Hora</h3>
                        <p className='text-sm font-normal'>{hora}</p>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Servicio</h3>
                        <p className='text-sm font-normal'>{servicio}</p>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Profesional</h3>
                        <p className='text-sm font-normal'>{profesional}</p>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Reservado el</h3>
                        <p className='text-sm font-normal'>{formatDate(fechaCreacion)}</p>
                    </div>
                    <div className='flex justify-between items-center text-blancoSecundario'>
                        <h3 className='text-sm font-medium'>Estado</h3>
                        <div className={` ${estado === 'confirmado' ? 'bg-verde' : 'bg-rojo'} rounded-lg p-[10px]`}>
                            <p className={`font-medium text-sm  text-negroPrincipal`}>{estado}</p>
                        </div>
                    </div>

                </div>
                <div>
                    {
                        estado === 'confirmado'
                            ? <button
                                onClick={() => {
                                    handleModal()
                                    setTurnoACancelar(modalDatosDeTurno)
                                    setModalDatosDeTurno({})
                                }}
                                className='flex justify-center items-center gap-x-2 rounded-xl py-[15px] px-6 w-full bg-amarillo text-[#1e1e1e] font-semibold text-sm'>
                                <img src="https://i.ibb.co/VC2sk8c/delete-2.png" alt="Cancelar" />
                                <p>Cancelar turno</p>
                            </button>

                            : <button
                                onClick={() => {
                                    setTurnoACancelar(modalDatosDeTurno)
                                    setModalEliminarTurno(!modalEliminarTurno)
                                }}
                                className='flex justify-center items-center gap-x-2 rounded-xl py-[15px] px-6 w-full bg-amarillo text-[#1e1e1e] font-semibold text-sm'>
                                <img src="https://i.ibb.co/VC2sk8c/delete-2.png" alt="Cancelar" />
                                <p>Eliminar</p>
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
