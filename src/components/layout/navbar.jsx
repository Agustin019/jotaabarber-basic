import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './navBarLinks'
import MenuHamburguesa from './menuHamburguesa'
import { useAuth } from '../../context/authContext'
import NavbarDropdown from './navbarDropdown'


export default function Navbar() {

  const [nav, setNav] = useState(false);
  const [scroll, setScroll] = useState(false);
  const auth = useAuth()
  const [showDropdown, setShowDropdown] = useState(false);

  const { datosUsuarioActual, setDatosUsuarioActual, traerDatosDeUsuarioActual, user,  logOut } = auth
  console.log(datosUsuarioActual)
  function handleDropdownToggle() {
    setShowDropdown(!showDropdown);
  }

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
        fixed z-40  h-[72px]   top-0 transition-colors duration-300 ease-out
        ${scroll || nav ? 'bg-negroPrincipal' : 'bg-transparent'}
        `}>
        <Link to="./">
          <img className='w-[4.3rem] lg:w-[4.9rem]' src='https://i.ibb.co/BBM0tyC/a6ae29a7-1496-4c0f-9a09-c2a18b4540c7-removebg-preview.png' alt="Logo" />
        </Link>
        <div className="hidden lg:flex">
          <NavbarLinks flexDirection={'flex-row'} />
        </div>
        <div className='flex justify-between gap-x-4 items-center font-normal leading-5 text-[18px] text-blanco z-50 '>

          <ul className='navegacion hidden lg:block'>
            <Link to='/turnos' className={`link ${location.pathname === '/turnos' ? 'activo' : ''}`}> Turnos</Link>
          </ul>

          <Link to='/nuevoturno' className=' mr-8 lg:mr-0 p-2 bg-amarillo rounded-lg font-semibold text-negroSecundario '>+ Nuevo Turno</Link>

          <div className="hidden lg:flex  items-center gap-x-1 text-xl ">
            {Object.keys(datosUsuarioActual).length !== 0
              ? <NavbarDropdown showDropdown={showDropdown} handleDropdownToggle={handleDropdownToggle} />
              : <Link to='/micuenta' className='flex items-center gap-x-1'> <ion-icon name="person-outline"></ion-icon> <p>Ingresar</p></Link>
            }

          </div>

          <MenuHamburguesa handleNav={handleNav} nav={nav} />
        </div>


        {/* Navbar responsive */}

      </nav>

      <div
        className={`
         ${ nav
            ? `lg:hidden fixed  top-0 w-full h-screen transition-colors duration-300 bg-black/40 z-30`
            : "transition-colors duration-300"
         } 
         
        `}
      >

        <div
          className={`
           ${ nav
              ? "fixed  top-0 w-screen h-[50%]  mt-12 ease-out duration-300 z-20"
              : "fixed top-[-100%] w-full p-10 ease-out transition-all duration-300 "
           }
           
          `}
        >
          <div className={` mt-6 p-4 flex flex-col items-start ease-out ${scroll ? 'bg-negroPrincipal duration-300' : 'bg-negroPrincipal duration-300'}  `}>
            <NavbarLinks flexDirection={'flex-col'} />
            
            <div className="md:hidden flex items-start gap-x-1 mt-8 text-xl text-blanco">
              <div className="flex items-start gap-x-1 text-xl ">
                {Object.keys(datosUsuarioActual).length !== 0
                  ? <ul className='flex flex-col gap-y-4 '>
                    <Link
                      to='/datos'
                      className="flex items-center gap-x-2  link"
                    >
                      <ion-icon name="person-outline"></ion-icon>
                      <p> Perfil</p>
                    </Link>
                    <Link to='/micuenta'
                      onClick={() => {
                        logOut()
                        //setDatosUsuarioActual({})
                      }}
                      className="flex items-center gap-x-2  "
                    >
                      <ion-icon name="log-out-outline"></ion-icon> Cerrar sesión
                    </Link>


                  </ul>
                  : <Link to='/micuenta' className='flex items-center gap-x-1'> <ion-icon name="person-circle-outline"></ion-icon> Ingresar</Link>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
