import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BotonCancelar = () => {

    const navigate = useNavigate()

    return (
        <button
            className='py-3 px-5 h-[51px] border border-stone-900 w-[356px] text-stone-900 bg-white font-semibold text-lg rounded-md'
            onClick={() => navigate(- 1)}
        >
            Cancelar reserva
        </button>
    )
}
export const BotonAvanzar = ({ step, setStep }) => {
    return (
        <button
            className='py-3 px-5 h-[51px] w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2'
            onClick={() => setStep(step + 1)}
        >
            Siguiente paso
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

export const BotonConfirmarTurno = () => {
    return (
        <button
            type='submit'
            className='py-3 px-5 h-[51px] w-[356px] bg-stone-900 text-white font-medium text-lg rounded-md flex justify-center items-center gap-2'
        >
          Confirmar turno
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
    )
}
