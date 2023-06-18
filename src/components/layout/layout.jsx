import { Outlet } from "react-router-dom"
import SideBar from "../client/cuenta/sideBar"
import DashBoard from "../admin/dashBoard"


export default function Layout() {


  if(location.pathname === '/admin' || 
    location.pathname === '/admin/turnos' || 
    location.pathname === '/admin/servicios' || 
    location.pathname === '/admin/diasyhorarios' || 
    location.pathname === '/admin/profesionales'
    ){
    return (
      <DashBoard />
    )
    
    } else{
      return null
    }
   
}
