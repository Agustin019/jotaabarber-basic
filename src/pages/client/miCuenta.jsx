import React, { useState, useEffect } from 'react';
import Login from '../../components/client/cuenta/login';
import Register from '../../components/client/cuenta/register';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import PantallaCargando from '../../components/utils/pantallaCargando';

export default function MiCuenta() {
  // Hooks Registro
  const [emailRegister, setEmailRegister] = useState('');
  

  // Hook para el formulario
  const [form, setForm] = useState('register');

  const {
    user,
    loginWithGoogle,
    loginWithFacebook,
    login,
    register,
    setDatosUsuarioActual,
    datosUsuarioActual,
    traerDatosDeUsuarioActual,
    passwordRegister,
    setPasswordRegister,
    isLoading,
    setIsLoading
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const redireccionarUsuario = () => {
      if (datosUsuarioActual && Object.keys(datosUsuarioActual).length !== 0) {
        toast.success('Bienvenido '+ '' + datosUsuarioActual?.fullName?.split(' ')[0])

        if (datosUsuarioActual.role === 'cliente') {
          navigate('/turnos');
        } else if (datosUsuarioActual.role === 'admin') {
          navigate('/admin/turnos');
        }
      }
    };
    setIsLoading(false);
    redireccionarUsuario();
  }, [datosUsuarioActual]);

  useEffect(() => {
    if (user && user.uid) {
      traerDatosDeUsuarioActual(); // Llamar a la función sin parámetros
      console.log('trayendo datos...');
    } else {
      console.log('No hay datos del usuario actual');
      setDatosUsuarioActual({});
    }
  }, [user]);
  // ...



  // FUnciones para registrarse y loguearse

  const handleRegister = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    await register(emailRegister, passwordRegister);

    // Esperar a que se registre el usuario
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false)
  };


  const handleGoogle = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
   // setIsLoading(true);
  };
  const handleFacebook = async (e) => {
    //setIsLoading(true);
    await loginWithFacebook();
  };


  return (
    <main className='flex w-full gap-x-10 max-h-screen overflow-hidden'>
      <section className='w-[90%] lg:w-[60%] m-auto py-5 lg:p-10'>
        <article className='flex flex-col gap-y-2'>
          <div
            className=' flex justify-start items-center w-56 gap-x-2 text-blanco cursor-pointer text-lg font-medium uppercase'
            onClick={() => navigate(- 1)}
          >
            <ion-icon name="arrow-back-sharp"></ion-icon>
            <p>volver</p>
          </div>

          <div className='flex gap-x-5 justify-start mt-3'>
            <button
              onClick={() => setForm('register')}
              className={`p-2 bg-transparent text-base md:text-2xl ${form === 'register' ? 'border-b-2 border-amarillo text-blanco font-bold' : 'font-medium text-gray-400'}`}
            >
              Registrarse
            </button>
            <button
              onClick={() => setForm('login')}
              className={`p-2 bg-transparent  text-base md:text-2xl ${form === 'login' ? 'border-b-2 border-amarillo text-blanco font-bold' : 'font-medium text-gray-400'}`}
            >
              Iniciar Sesion
            </button>
          </div>

        </article>
        {form === 'login' ? (
          <Login
            setIsLoading={setIsLoading}
            login={login}
            handleGoogle={handleGoogle}
            handleFacebook={handleFacebook}
          />
        ) : (
          <Register
            setEmailRegister={setEmailRegister}
            setPasswordRegister={setPasswordRegister}
            handleRegister={handleRegister}
            handleGoogle={handleGoogle}
            handleFacebook={handleFacebook}
          />
        )}
        <PantallaCargando isLoading={isLoading} />

      </section>
      <section className='hidden w-[40%] h-screen lg:flex flex-col items-center justify-center rounded-xl'>
        <img
          className='w-full h-full object-cover'
          src="https://i.ibb.co/gTZRmYM/ae2b7f7f-30a2-4a80-ac6a-0a5c8b6f6250-min.jpg"
          alt="foto barber"
        />
      </section>
    </main>
  );

  // ...
}