import React, { useState } from 'react'
import Login from '../components/client/cuenta/login'
import Register from '../components/client/cuenta/register'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

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
  console.log(auth)
  const navigate = useNavigate()
  const { displayName } = auth.user

  console.log(displayName)

  const handleLogin = async e => {
    e.preventDefault()
    await auth.login(email, password)
    navigate('/usuario')
  }
  const handleRegister = async e => {
    e.preventDefault()
    await auth.register(emailRegister, passwordRegister)
    navigate('/usuario')
  }
  const hanldeGoogle = async (e) => {
    e.preventDefault()
     await auth.loginWithGoogle()
    navigate('/usuario')
  }

  const handleLogOut = () => {
    auth.logOut()
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
          <button onClick={handleLogOut} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Log Out</button>
        </article>
      </section>
    </main>
  )
}
