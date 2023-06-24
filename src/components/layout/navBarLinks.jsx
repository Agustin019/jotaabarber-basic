import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { animateScroll as scroll, Link as LinkScroll } from 'react-scroll';

export default function NavbarLinks({ flexDirection }) {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
    });
  };

  return (
    <ul
      className={`navegacion flex items-start lg:items-center gap-x-7 font-normal leading-5 text-[18px] z-10 ${flexDirection}`}
    >
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="inicio"
          className='link'
          activeClass="activo"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Inicio
        </LinkScroll>
      </li>
      <div className="lg:hidden">
        <li className={`link ${location.pathname === '/turnos' ? 'activo' : ''}`}>
          <Link to={'/turnos'}>Turnos</Link>
        </li>
      </div>
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="nosotros"
          activeClass="activo"
          className='link'
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Nosotros
        </LinkScroll>
      </li>
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="servicios"
          activeClass="activo"
          className='link'
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Servicios
        </LinkScroll>
      </li>
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="team"
          activeClass="activo"
          className='link'
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Equipo
        </LinkScroll>
      </li>
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="testimonios"
          activeClass="activo"
          className='link'
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          Testimonios
        </LinkScroll>
      </li>
    
      <li className={` cursor-pointer`}>
        <LinkScroll
          to="contacto"
          className='link'
          activeClass="activo"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          Contacto
        </LinkScroll>
      </li>
    
    </ul>
  );
}
