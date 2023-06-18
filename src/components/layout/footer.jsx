import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export default function Footer() {
    const { datosUsuarioActual } = useAuth()
    const links = [
        {
            id: 1,
            nombre: 'Inicio',
            pathname: '/inicio'
        },
        {
            id: 2,
            nombre: 'Nosotros',
            pathname: '/nosotros'
        },
        {
            id: 3,
            nombre: 'Servicios',
            pathname: '/servicios'
        },
        {
            id: 4,
            nombre: 'Equipo',
            pathname: '/equipo'
        },
        {
            id: 5,
            nombre: 'Testimonios',
            pathname: '/testimonios'
        },
        {
            id: 6,
            nombre: 'Contacto',
            pathname: '/contacto'
        },
    ]

    return (
        <footer className='bg-[#676B6C] w-full mt-20'>
            <div className='flex flex-col items-center py-10'>
                <img className='w-[181px]' src="https://i.ibb.co/qxH90r1/dffe70f8-5ff0-4439-b1ba-9199478e6888.jpg" alt="logo" />
                <div className='flex flex-col md:flex-row md:gap-x-8 lg:gap-x-12 items-center text-center gap-y-5 pt-10'>
                    {
                        links.map(link => <Link
                            key={link.id}
                            to={link.pathname}
                            className='font-bold text-base'
                        >
                            {link.nombre}
                        </Link>)
                    }
                </div>
                <div className='text-xl font-medium pt-5'>
                    {
                        Object.keys(datosUsuarioActual).length !== 0
                            ? <Link
                                to='/datos'
                                className='flex items-center gap-x-1'>
                                <ion-icon name="person-circle-outline"></ion-icon><p>{datosUsuarioActual?.fullName?.split(' ')[0]}</p></Link>
                            : <Link
                                to='/micuenta'
                                className='flex items-center gap-x-1'>
                                <ion-icon name="person-circle-outline"></ion-icon> <p>Ingresar</p></Link>
                    }
                </div>
                <p className='text-[#FDFFFC] font-light text-sm sm:text-base pt-10 '>&copy;Todos los derechos reservados | Booknow 2023</p>
            </div>
        </footer>
    )
}
