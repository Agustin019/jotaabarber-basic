import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/barberpool.png' 

export default function Navbar() {
  return (
    <div className='flex justify-around items-center'>
        <div className='flex gap-x-2 items-center'>
            <img className='h-12 w-8' src={Logo} alt="Logo" />
            <p className='text-xl font-bold uppercase'>Jota Barber</p>
        </div>
        <nav className='flex gap-x-3'>
            <Link to={'/'}>Inicio</Link>
            <Link to={'/nosotros'}>Nosotros</Link>
            <Link to={'/turnos'}>Turnos</Link>
            <Link to={'/nosotros'}>Log in</Link>
        </nav>
    </div>
  )
}
