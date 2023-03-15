import React from 'react'
import { Link, useLocation } from 'react-router-dom'
//import Logo from ''

export default function Navbar() {

  const location = useLocation()

  return (
    <div className='flex justify-around items-center bg-black'>
      <div className='flex gap-x-2 items-center'>
        <img className='w-[5rem]' src='https://i.ibb.co/XX7rF46/image.png' alt="Logo" />
  
      </div>
      <nav className='flex gap-x-3 text-white font-semibold'>
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
