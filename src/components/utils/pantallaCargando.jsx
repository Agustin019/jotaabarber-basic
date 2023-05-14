import { Transition } from '@headlessui/react';
import { CircularProgress } from '@mui/material'

export default function PantallaCargando({ isLoading }) {

    return (
        <Transition show={isLoading}>
            <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="w-64 h-64 text-white flex flex-col items-center justify-center">
                    <CircularProgress color="inherit" />
                    <div className="mt-4 font-bold text-lg">Cargando...</div>
                </div>
            </div>
        </Transition>
    );
}

;
