import React from 'react'
import { Link, animateScroll as scroll, scroller } from 'react-scroll'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export default function Footer() {

    const { datosUsuarioActual } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()

    const links = [
        {
            id: 1,
            nombre: 'Inicio',
            pathname: 'inicio',
            offset: -100
        },
        {
            id: 2,
            nombre: 'Trabajos',
            pathname: 'trabajos',
            offset: -80
        },
        {
            id: 3,
            nombre: 'Servicios',
            pathname: 'servicios',
            offset: -75
        },
        {
            id: 5,
            nombre: 'Testimonios',
            pathname: 'testimonios',
            offset: -50
        },
        {
            id: 6,
            nombre: 'Contacto',
            pathname: 'contacto',
            offset: -50
        },
    ]

    const isHomePage = location.pathname === '/';


    const hadleLinkClick = (link, offset) => {
        if (!isHomePage) {
            navigate('/')
            setTimeout(() => {
                scroller.scrollTo(link, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: offset
                })
            }, 300);
        }else{
            scroller.scrollTo(link, {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: offset
            })
        }
    }

    return (
        <footer className='bg-negroSecundario w-full mt-20'>
            <div className='flex flex-col items-center py-10'>
                <img className='w-[131px]' src="https://i.ibb.co/BBM0tyC/a6ae29a7-1496-4c0f-9a09-c2a18b4540c7-removebg-preview.png" alt="logo" />
                <div className='flex flex-col text-white md:flex-row md:gap-x-8 lg:gap-x-12 items-center text-center gap-y-5 pt-10'>
                    {
                        links.map(link =>
                            <Link
                                key={link.id}
                                to={link.pathname}
                                onClick={() => hadleLinkClick(link.pathname, link.offset)}
                                className='font-bold text-base cursor-pointer'
                                spy={true}
                            >
                                {link.nombre}
                            </Link>)
                    }
                </div>
                <div className='text-xl font-medium pt-5 text-white'>
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
