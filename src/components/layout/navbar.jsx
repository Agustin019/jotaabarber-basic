import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavbarLinks from './navBarLinks'
import MenuHamburguesa from './menuHamburguesa'
import { useAuth } from '../../context/authContext'


export default function Navbar() {

  const [nav, setNav] = useState(false);
  const [scroll, setScroll] = useState(false);
  const auth = useAuth()
  const { datosUsuarioActual, setDatosUsuarioActual, traerDatosDeUsuarioActual, user } = auth


  const handleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (user && user.uid) {
      traerDatosDeUsuarioActual();
    } else {
      setDatosUsuarioActual({})
    }
  }, [user])

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  return (
    <>
      <nav className={`
        flex flex-row w-full justify-between items-center px-4  md:p-4 lg:p-[43px] 
        fixed z-20  h-[72px]   top-0 transition-colors duration-300 ease-out
        ${scroll ? 'bg-zinc-900 duration-300' : ''}  
          `}>
        <Link to="./">
          <img className='w-[3.9rem]' src='https://i.ibb.co/XX7rF46/image.png' alt="Logo" />
        </Link>
        <div className="hidden md:flex">
          <NavbarLinks flexDirection={'flex-row'} />
        </div>
        <div className='flex flex-row items-center  text-white font-normal leading-5 text-[18px] z-50 '>
          <div className="hidden md:flex  items-center gap-x-1 text-xl ">
            <ion-icon name="person-circle-outline"></ion-icon>
            <Link to={datosUsuarioActual ? '/usuario' : '/micuenta'}>
              {datosUsuarioActual?.fullName ? datosUsuarioActual.fullName.split(' ')[0] : 'Ingresar'}
            </Link>

          </div>

          <MenuHamburguesa handleNav={handleNav} nav={nav} />
        </div>


        {/* Navbar responsive */}

      </nav>

      <div
        className={
          nav
            ? `md:hidden fixed  top-0 w-full h-screen transition-colors duration-300 bg-black/40 z-10`
            : "transition-colors duration-300"
        }
      >

        <div
          className={
            nav
              ? "fixed  top-0 w-screen h-[50%]  mt-12 ease-out duration-300 z-20"
              : "fixed top-[-100%] w-full p-10 ease-out transition-all duration-300 "
          }
        >
          <div className={` mt-6 py-4 flex flex-col items-center ease-out ${scroll ? 'bg-zinc-800 duration-300' : 'bg-zinc-900 duration-300'}  `}>
            <NavbarLinks flexDirection={'flex-col'} />

            <div className="md:hidden flex text-white items-center gap-x-1 mt-5 text-xl">
              <ion-icon name="person-circle-outline"></ion-icon>
              <Link to={'/micuenta'} >
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
