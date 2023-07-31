import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../layout/navbar'
import { Transition } from '@headlessui/react';


export default function PantallaTurnoConfirmado({ modal }) {
    return (
        <Transition show={modal}
            className='fixed h-screen w-full bg-negroPrincipal z-20'>
            <Navbar />
            <div className='flex flex-col gap-y-8 justify-center items-center mt-24'>
                <svg xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 244 244" fill="none">
                    <path d="M104.967 143.9L78.8084 117.742C76.5779 115.511 73.739 114.396 70.2918 114.396C66.8446 114.396 64.0057 115.511 61.7751 117.742C59.5446 119.972 58.4293 122.811 58.4293 126.259C58.4293 129.706 59.5446 132.545 61.7751 134.775L96.4501 169.45C98.8834 171.884 101.722 173.1 104.967 173.1C108.211 173.1 111.05 171.884 113.483 169.45L182.225 100.708C184.456 98.4779 185.571 95.6391 185.571 92.1918C185.571 88.7446 184.456 85.9057 182.225 83.6752C179.995 81.4446 177.156 80.3293 173.708 80.3293C170.261 80.3293 167.422 81.4446 165.192 83.6752L104.967 143.9ZM122 243.667C105.17 243.667 89.3529 240.473 74.5501 234.086C59.7473 227.698 46.8709 219.029 35.9209 208.079C24.9709 197.129 16.3022 184.253 9.91469 169.45C3.52718 154.647 0.333435 138.831 0.333435 122C0.333435 105.17 3.52718 89.3529 9.91469 74.5502C16.3022 59.7474 24.9709 46.871 35.9209 35.921C46.8709 24.971 59.7473 16.3022 74.5501 9.91475C89.3529 3.52725 105.17 0.333496 122 0.333496C138.831 0.333496 154.647 3.52725 169.45 9.91475C184.253 16.3022 197.129 24.971 208.079 35.921C219.029 46.871 227.698 59.7474 234.086 74.5502C240.473 89.3529 243.667 105.17 243.667 122C243.667 138.831 240.473 154.647 234.086 169.45C227.698 184.253 219.029 197.129 208.079 208.079C197.129 219.029 184.253 227.698 169.45 234.086C154.647 240.473 138.831 243.667 122 243.667Z" fill="#78BC61" />
                </svg>

                <p className='font-bold  text-2xl text-blanco'>¡Reserva Confirmada!</p>
                <p className='font-light text-sm sm:text-base text-center px-2 text-blanco font-OpenSans'>Puedes revisar el estado de tu reserva o cancelarla si lo deseas desde tu perfil.</p>
                <Link
                    to='/turnos'
                    className='w-[209px] h-[48px] py-3 px-6 flex justify-center items-center bg-amarillo text-negroPrincipal rounded-lg font-bold text-base uppercase'
                >
                    Ver turno
                </Link>
            </div>
        </Transition>
    )
}
