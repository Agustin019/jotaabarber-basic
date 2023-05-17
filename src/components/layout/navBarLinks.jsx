import React from 'react'
import { Link, useLocation } from "react-router-dom"


export default function NavbarLinks({ flexDirection }) {
    const location = useLocation() 
    

    return (
        <ul className={`navegacion flex items-center gap-x-7 font-normal leading-5 text-[18px] z-10
            ${flexDirection}
        `}>

            <li className={`link ${location.pathname === '/' ? 'activo' : ''}`}>
                <Link className="" to={'/'}>
                    Inicio
                </Link>
            </li>
            <li className={`link ${location.pathname === '/turnos' ? 'activo' : ''}`}>
                <Link to={'/turnos'}>
                    Turnos
                </Link>
            </li>
            <li className={`link ${location.pathname === '/#' ? 'activo' : ''}`}>
                <Link to={'/#'}>
                    Sobre nosotros
                </Link>
            </li>
            <li className={`link ${location.pathname === '/calendario' ? 'activo' : ''}`}>
                <Link to={'/calendario'}>
                    Calendario
                </Link>
            </li>
            <li className={`link ${location.pathname === '/#' ? 'activo' : ''}`}>
                <Link to={'/#'}>
                    Equipo
                </Link>
            </li>
            <li className={`link ${location.pathname === '/#' ? 'activo' : ''}`}>
                <Link to={'/#'}>
                    Testimonios
                </Link>
            </li>
            <li className={`link ${location.pathname === '/#' ? 'activo' : ''}`}>
                <Link to={'/#'}>
                    Contacto
                </Link>
            </li>
            
        </ul>
    )
}


