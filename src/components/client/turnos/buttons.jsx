import React from 'react'

export const BotonAvanzar = ({ step, setStep }) => {
    return (
        <button
            className='py-3 px-5 h-[51px] w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2'
            onClick={() => setStep(step + 1)}
        >
            {step === 3 ? 'Confirmar turno' : 'Siguiente paso'}
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}

export const BotonAvanzarDeshabilitado = ({ step }) => {
    return (
        <button
            className='py-3 px-5 h-[51px] w-[356px] bg-gray-400 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2 '
            disabled
        >
            {step === 3 ? 'Confirmar turno' : 'Siguiente paso'}
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}

