import React from 'react'
import './index.css'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/utils/privateRoute'
import Layout from './components/layout/layout'
import Turnos from './pages/turnos'
import Agenda from './pages/agenda'
import AdministrarTurnos from './pages/administrarTurnos'
import Inicio from './pages/inicio'
import InicioAdmin from './pages/inicioAdmin'

import MiCuenta from './pages/miCuenta'
import Usuario from './pages/client/usuario'
import { useAuth } from './context/authContext'

function App(){

const { user } = useAuth()
console.log(user)

    return (
        <BrowserRouter>
            <Layout/>
            <Routes>
                //Cliente
                <Route path='/' element={<Inicio/>}/>
                <Route path='/turnos' element={ user ?<Turnos/> :<MiCuenta/>}/> 
                <Route path='/micuenta' element={<MiCuenta/>}/>
                <Route path='/usuario' element={<Usuario/>}/>

                //Admin
                <Route path='/admin' element={<InicioAdmin/>}/>
                <Route path='/admin/agenda' element={<Agenda/>}/>
                <Route path='/admin/administrarturnos' element={<AdministrarTurnos/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App
