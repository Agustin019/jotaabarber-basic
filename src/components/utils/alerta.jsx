import React from 'react'

export default function Alerta({ 
        titulo, 
        texto,
        nombre,
        txtBtnCancelar, 
        txtBtnConfirmar, 
        cancelar, 
        confirmar 
    }) {
    return (
        <div className='fixed h-screen w-screen top-0 left-0 flex flex-col justify-center items-center bg-black/20 z-40 '>
            <div className='w-[322px]  md:w-[644px] md:h-[351px] py-8 px-6 bg-negroPrincipal rounded-xl flex flex-col items-center gap-[40px]'>
                <div className='flex flex-col items-center gap-3 text-[#fdfffc]'>
                    <img className='w-10' src="https://i.ibb.co/Tr456LC/delete-5.png" alt="icono eliminar" />
                    <p className='font-semibold text-[28px] '>{titulo}</p>
                </div>
                <p className='font-light text-base text-center text-[#FDFFFC]'>
                    {texto}
                </p>
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <button
                        type='button'
                        onClick={cancelar} 
                        className='
                            w-[282px] h-[52px] py-[15px] px-6 flex justify-center gap-[10px] items-center
                            bg-transparent rounded-lg font-semibold text-lg border border-white text-white'>
                        {txtBtnCancelar}
                    </button>
                    <button
                        type='button'
                        onClick={confirmar} 
                        className='
                        w-[282px] h-[52px] py-[15px] px-6 flex justify-center gap-[10px] items-center 
                        bg-amarillo rounded-lg font-semibold text-lg text-negroPrincipal
                    '>
                        {txtBtnConfirmar}
                    </button>

                </div>
            </div>
        </div>
    )
}
