import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../layout/navbar'
import { Transition } from '@headlessui/react';


export default function PantallaTurnoConfirmado({ modal }) {
    return (
        <Transition show={modal}
            className='fixed h-screen w-full bg-white z-20'>
            <Navbar />
            <div className='flex flex-col gap-y-8 justify-center items-center mt-24'>
                <svg width="292" height="292" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_132_515" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="292" height="292">
                        <rect width="292" height="292" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_132_515)">
                        <path d="M128.967 167.9L102.809 141.742C100.578 139.511 97.7391 138.396 94.2918 138.396C90.8446 138.396 88.0057 139.511 85.7752 141.742C83.5446 143.972 82.4293 146.811 82.4293 150.258C82.4293 153.705 83.5446 156.544 85.7752 158.775L120.45 193.45C122.883 195.883 125.722 197.1 128.967 197.1C132.211 197.1 135.05 195.883 137.483 193.45L206.225 124.708C208.456 122.478 209.571 119.639 209.571 116.192C209.571 112.744 208.456 109.905 206.225 107.675C203.995 105.444 201.156 104.329 197.708 104.329C194.261 104.329 191.422 105.444 189.192 107.675L128.967 167.9ZM146 267.667C129.17 267.667 113.353 264.473 98.5502 258.085C83.7474 251.698 70.871 243.029 59.921 232.079C48.971 221.129 40.3022 208.253 33.9147 193.45C27.5272 178.647 24.3335 162.83 24.3335 146C24.3335 129.169 27.5272 113.353 33.9147 98.5499C40.3022 83.7471 48.971 70.8708 59.921 59.9208C70.871 48.9708 83.7474 40.302 98.5502 33.9145C113.353 27.527 129.17 24.3333 146 24.3333C162.831 24.3333 178.647 27.527 193.45 33.9145C208.253 40.302 221.129 48.9708 232.079 59.9208C243.029 70.8708 251.698 83.7471 258.086 98.5499C264.473 113.353 267.667 129.169 267.667 146C267.667 162.83 264.473 178.647 258.086 193.45C251.698 208.253 243.029 221.129 232.079 232.079C221.129 243.029 208.253 251.698 193.45 258.085C178.647 264.473 162.831 267.667 146 267.667Z" fill="#1C1B1F" />
                    </g>
                </svg>

                <p className='font-bold  text-2xl'>¡Reserva Confirmada!</p>
                <p className='font-light text-sm sm:text-base text-center px-2'>Puedes revisar el estado de tu reserva o cancelarla si lo deseas desde tu perfil.</p>
                <Link
                    to='/turnos'
                    className='w-[209px] h-[48px] py-3 px-6 flex justify-center items-center bg-black text-white font-bold text-base uppercase'
                >
                    Ver turno
                </Link>
            </div>
        </Transition>
    )
}
