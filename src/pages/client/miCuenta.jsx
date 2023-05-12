import React, { useState } from 'react'
import Login from '../../components/client/cuenta/login'
import Register from '../../components/client/cuenta/register'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'

export default function MiCuenta() {
  // Hooks Registro
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")

  // Hooks Log In
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Hook para el formulario
  const [form, setForm] = useState('login')

  const { user, loginWithGoogle, login, register, logOut } = useAuth()
  const navigate = useNavigate()

  console.log(user)
  const crearDocumentoDeUsuario = async () => {
    if(user?.uid){
      const docRef = doc(db,'usuarios', user.uid)
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef, {
          uid:user.uid,
          email:user.email,
          role:'cliente',
          fullName:user.displayName
        })
        console.log('Cliente registrado en la base de datos correctamente')
      }else{
        console.log('Cliente ya registrado')
      }
    }
  }
  crearDocumentoDeUsuario()

  // FUnciones para registrarse y logiearse
  const handleLogin = async e => {
    e.preventDefault()
    await login(email, password)
    navigate('/usuario')
  }
  const handleRegister = async e => {
    e.preventDefault()
    await register(emailRegister, passwordRegister)
    navigate('/usuario')
  }
  const hanldeGoogle = async (e) => {
    e.preventDefault()
    await loginWithGoogle()
    console.log(user)

    // navigate('/usuario')
  }

  const handleLogOut = () => {
    logOut()
  }

  return (
    <main className='w-[90%] mx-auto'>
      <section className='w-full mt-20'>
        <article className='flex gap-x-5 justify-center'>
          <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('login')}>Iniciar Sesion</button>
          <button className='rounded-xl p-2 bg-neutral-800 text-white font-medium' onClick={() => setForm('register')}>Registrarse</button>
        </article>
        <article className='w-[40%] mx-auto my-10'>
          {user.displayName && <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{user.displayName}</h2>}
          <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{form}</h2>
          <button onClick={hanldeGoogle} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Iniciar sesion con Google</button>
          {
            form === 'login'
              ? <Login setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} />
              : <Register setEmailRegister={setEmailRegister} setPasswordRegister={setPasswordRegister} handleRegister={handleRegister} />
          }
          <button onClick={handleLogOut} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Log Out</button>
        </article>
      </section>
    </main>
  )
}
