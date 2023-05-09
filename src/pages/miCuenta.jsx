import React, { useState } from 'react'
import Login from '../components/login'
import Register from '../components/register'

export default function MiCuenta() {
    const [ form, setForm ] = useState('login')

    const [ emailRegister, setEmailRegister ] = useState("")
    const [ passwordRegister, setPasswordRegister ] = useState("")

    const handleRegister = (e) => {
        e.preventDefault()
    }

  return (
    <main className='w-[90%] mx-auto'>
        <section className='w-full mt-20'> 
            <article className='flex gap-x-5 justify-center'>
                <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('login')}>Iniciar Sesion</button>
                <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('register')}>Registrarse</button>
            </article>
           <article className='w-[40%] mx-auto my-10'>
             {
                 form === 'login' 
                 ? <Login/>
                 : <Register setEmailRegister={setEmailRegister} setPasswordRegister={setPasswordRegister}/>
             }
           </article>
        </section>
    </main> 
  )
}
