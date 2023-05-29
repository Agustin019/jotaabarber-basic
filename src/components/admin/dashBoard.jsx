import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

export default function DashBoard() {

    const { logOut } = useAuth()
    const navigate = useNavigate()

    const routes = [
        {
            id: 1,
            name: 'Turnos',
            pathname: '/admin/turnos',
            icon: 'reader'
        },
        {
            id: 2,
            name: 'Dias y horarios',
            pathname: '/admin/diasyhorarios',
            icon: 'calendar-number'
        },
        {
            id: 3,
            name: 'Servicios',
            pathname: '/admin/servicios',
            icon: 'cut'
        },
        {
            id: 4,
            name: 'Profesionales',
            pathname: '/admin/Profesionales',
            icon: 'people'
        },
    ]
    return (
        <aside className='w-[250px]  bg-[#2D2D2D] h-screen fixed top-0 left-0'>
            <div className='h-full flex flex-col justify-around items-center '>
                <img
                    src="https://i.ibb.co/qxH90r1/dffe70f8-5ff0-4439-b1ba-9199478e6888.jpg"
                    alt="logo"
                    className='w-[200px]'
                />
                <div className='flex flex-col gap-y-2 items-start'>
                    {
                        routes.map(route =>
                            <div
                                key={route.id}
                                className={`w-[226px] py-2 px-4 flex gap-x-2 text-white ${location.pathname === route.pathname ? ' bg-[#1e1e1e] ' : ''}`}
                            >
                                <p className='text-lg pt-1 text-[#fdfffc]'>
                                    <ion-icon name={route.icon}></ion-icon>
                                </p>
                                <Link

                                    to={route.pathname}
                                    className={`
                                    text-sm text-[#fdfffc]  w-[226px] pt-[5px]
                                    ${location.pathname === route.pathname ? 'font-bold ' : ' font-light'}
                         `}
                                >
                                    {route.name}
                                </Link>
                            </div>
                        )
                    }
                </div>

                <div className='w-[226px] flex py-2 px-4 items-center '>
                   <button 
                        className=' flex gap-x-1 items-center text-sm text-[#fdfffc]'
                        onClick={() => {
                            logOut()
                            navigate('/micuenta')
                        } }
                    >
                    <p className='text-lg pt-[5px]'>
                      <ion-icon name="log-out-outline"></ion-icon>
                    </p>
                     <p>Cerrar sesión</p>
                   </button>
                </div>
            </div>
        </aside>
    )
}
