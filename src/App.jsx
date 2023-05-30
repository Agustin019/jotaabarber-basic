import React from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/authContext'

import Layout from './components/layout/layout'
import NuevoTurno from './pages/client/nuevoTurno'
import Agenda from './pages/admin/agenda'
import AdministrarTurnos from './pages/admin/administrarTurnos'
import Inicio from './pages/client/inicio'
import TurnosAdmin from './pages/admin/turnosAdmin'

import MiCuenta from './pages/client/miCuenta'

import CalendarioPrueba from './pages/client/calendarioPrueba'

import SideBar from './components/client/cuenta/sideBar'
import TurnosDeUsuario from './pages/client/turnosDeUsuario'
import DatosDeUsuario from './pages/client/datosDeUsuario'
import DashBoard from './components/admin/dashBoard'
import ServiciosAdmin from './pages/admin/serviciosAdmin'
import ProfesionalesAdmin from './pages/admin/profesionalesAdmin'

function App() {

    const { user, datosUsuarioActual } = useAuth()
    const { role } = datosUsuarioActual


    return (
        <BrowserRouter>
            {user ? <Layout/> : ''}
            <Routes>
                //Cliente
                <Route path='/' element={<Inicio />} />
                <Route path='/nuevoturno' element={user ? <NuevoTurno /> : <MiCuenta />} />
                <Route path='/micuenta' element={<MiCuenta />} />
                //Admin
                <Route path='/turnos' element={user ? <TurnosDeUsuario /> : <MiCuenta />} />
                <Route path='/datos' element={user ? <DatosDeUsuario /> : <MiCuenta />} />

                <Route path='/admin/turnos' element={<TurnosAdmin />} />
                <Route path='/admin/diasyhorarios' element={<Agenda />} />
                <Route path='/admin/servicios' element={<ServiciosAdmin />} />
                <Route path='/admin/profesionales' element={<ProfesionalesAdmin/>} />

            </Routes>

        </BrowserRouter >
    )
}

export default App
