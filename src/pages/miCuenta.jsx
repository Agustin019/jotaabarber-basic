import React, { useState } from 'react'
import Login from '../components/login'
import Register from '../components/register'
import { useAuth } from '../context/authContext'
import { subMonths } from 'date-fns'

export default function MiCuenta() {
  // Hooks Registro
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")

  // Hooks Log In
  const [ email, setEmail ] = useState('') 
  const [ password, setPassword ] = useState('') 

  // Hook para el formulario
  const [form, setForm] = useState('login')

  const auth = useAuth()
  const { displayName } = auth.user

  console.log(displayName)

  const handleLogin = e => {
    e.preventDefault()
    auth.login(email, password)
  }
  const handleRegister = e => {
    e.preventDefault()
    auth.register(emailRegister, passwordRegister)
  }
  const hanldeGoogle = (e) => {
    e.preventDefault()
    auth.loginWithGoogle()
  }

  return (
    <main className='w-[90%] mx-auto'>
      <section className='w-full mt-20'>
        <article className='flex gap-x-5 justify-center'>
          <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('login')}>Iniciar Sesion</button>
          <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('register')}>Registrarse</button>
        </article>
        <article className='w-[40%] mx-auto my-10'>
          { displayName && <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{displayName}</h2>}
          <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{form}</h2>
          <button onClick={hanldeGoogle} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Iniciar sesion con Google</button>
          {
            form === 'login'
              ? <Login setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin}/>
              : <Register setEmailRegister={setEmailRegister} setPasswordRegister={setPasswordRegister} handleRegister={handleRegister} />
          }
        </article>
      </section>
    </main>
  )
}
