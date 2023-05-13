import React, { useState, useEffect } from 'react'
import Login from '../../components/client/cuenta/login'
import Register from '../../components/client/cuenta/register'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'

export default function MiCuenta() {
  // Hooks Registro
  const [fullName, setFullname] = useState('')
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")


  // Hook para el formulario
  const [form, setForm] = useState('login')

  const { user, loginWithGoogle, login, register, logOut, datosUsuarioActual } = useAuth()

  const navigate = useNavigate()

  console.log(datosUsuarioActual)
  useEffect(() => {
    async function updateDocument() {
      await crearDocumentoDeUsuario();
    }
    updateDocument();
  }, [datosUsuarioActual]);
  
  const crearDocumentoDeUsuario = async () => {
    if (user?.uid) {
      const docRef = doc(db, 'usuarios', user.uid)
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          role: 'cliente',
          fullName: user.displayName !== null ? user.displayName : fullName
        })
        console.log('Cliente registrado en la base de datos correctamente')
      } else {
        console.log('Cliente ya registrado')
      }
    }
  }
 

  // FUnciones para registrarse y logiearse

  const handleRegister = async e => {
    e.preventDefault()
    await register(emailRegister, passwordRegister)
    //navigate('/usuario')
  }
  const hanldeGoogle = async (e) => {
    e.preventDefault()
    await loginWithGoogle()
    await crearDocumentoDeUsuario()
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
          {datosUsuarioActual?.fullName && <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{datosUsuarioActual.fullName}</h2>}
          <h2 className='text-center font-semibold text-2xl text-zinc-800 py-10'>{form}</h2>
          <button onClick={hanldeGoogle} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Iniciar sesion con Google</button>
          {
            form === 'login'
              ? <Login login={login} navigate={navigate} />
              : <Register setFullname={setFullname} setEmailRegister={setEmailRegister} setPasswordRegister={setPasswordRegister} handleRegister={handleRegister} />
          }
          <button onClick={handleLogOut} className='w-full bg-white border border-zinc-800 rounded-md p-2 my-5'>Log Out</button>
        </article>
      </section>
    </main>
  )
}
