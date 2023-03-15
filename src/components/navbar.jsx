import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assests/barberpool.png'

export default function Navbar() {

  const location = useLocation()

  return (
    <div className='flex justify-around items-center'>
      <div className='flex gap-x-2 items-center'>
        <img className='h-12 w-8' src={Logo} alt="Logo" />
        <p className='text-xl font-bold uppercase'>Jota Barber</p>
      </div>
      <nav className='flex gap-x-3'>
        {
          location.pathname === '/' || location.pathname === '/turnos' || location.pathname === '/usuario' || location.pathname === '/nosotros'
            ? (
              <>
                <Link to={'/'}>Inicio</Link>
                <Link to={'/nosotros'}>Nosotros</Link>
                <Link to={'/turnos'}>Turnos</Link>
                <Link to={'/nosotros'}>Log in</Link>
              </>  
            )
            :
            (
              <>
                <Link to={'/admin'}>Inicio</Link>
                <Link to={'/admin/agenda'}>Agenda</Link>
                <Link to={'/admin/administrarturnos'}>Administrar turnos</Link>
              </>
            )
            }
      </nav>
    </div>
  )
}
