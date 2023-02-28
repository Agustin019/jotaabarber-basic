import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import Nosotros from './pages/nosotros'
import Turnos from './pages/turnos'
import Agenda from './pages/agenda'



const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <h1>Inicio con outlet</h1>
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
        element: <h2 className='text-xl font-semibold text-center mt-20 text-teal-700 '>Inicio admin</h2>
      },
      {
        path:'/admin/agenda',
        element: <Agenda/>
      },
      {
        path:'/admin/administrarturnos',
        element: <h2 className='text-xl font-bold text-teal-600 text-center mt-20'>Administrar turnos</h2>
      },
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
