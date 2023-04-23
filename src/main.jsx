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



const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <Inicio/>
      },
      {
        path: '/nosotros',
        element: <Nosotros/>
      },
      {
        path: '/turnos',
        element: <Turnos/>
      }
    ]
  },
  {
    path:'/admin',
    element:<Layout/>,
    children:[
      {
        index:true,
        element: <InicioAdmin/>
      },
      {
        path:'/admin/agenda',
        element: <Agenda/>
      },
      {
        path:'/admin/administrarturnos',
        element: <AdministrarTurnos/>
      },
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
