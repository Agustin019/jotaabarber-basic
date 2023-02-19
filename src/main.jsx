import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import Nosotros from './pages/nosotros'
import Turnos,{ action, action as actionTurnos } from './pages/turnos'



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
        element: <Turnos/>,
        action: actionTurnos
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
