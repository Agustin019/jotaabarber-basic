import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import Nosotros from './pages/nosotros'
import Turnos from './pages/turnos'
import Agenda from './pages/agenda'
import AdministrarTurnos from './pages/administrarTurnos'
import Inicio from './pages/inicio'
import InicioAdmin from './pages/inicioAdmin'
import withAuth from './utils/auth/withAuth'; // importa el componente withAuth
import { AuthProvider } from './context/authContext'
import MiCuenta from './pages/miCuenta'
import Usuario from './pages/client/usuario'

function App(){

    const router = createBrowserRouter([
        
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Inicio />
                },
                {
                    path: '/nosotros',
                    element: <Nosotros />
                },
                {
                    path: '/turnos',
                    element: withAuth(Turnos) // envuelve la ruta de Turnos en el componente withAuth
                },
                {
                    path: '/micuenta',
                    element: <MiCuenta />
                },
                {
                    path: '/usuario',
                    element: <Usuario />
                }
            ]
        },
        {
            path: '/admin',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <InicioAdmin />
                },
                {
                    path: '/admin/agenda',
                    element: withAuth(Agenda) // envuelve la ruta de Agenda en el componente withAuth
                },
                {
                    path: '/admin/administrarturnos',
                    element: withAuth(AdministrarTurnos) // envuelve la ruta de AdministrarTurnos en el componente withAuth
                },
            ]
        }

    ])

    return (
        <React.StrictMode>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </React.StrictMode>
  )
}

export default App
