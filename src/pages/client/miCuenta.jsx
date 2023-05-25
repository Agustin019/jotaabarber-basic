import React, { useState, useEffect } from 'react';
import Login from '../../components/client/cuenta/login';
import Register from '../../components/client/cuenta/register';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

import PantallaCargando from '../../components/utils/pantallaCargando';

export default function MiCuenta() {
  // Hooks Registro
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hook para el formulario
  const [form, setForm] = useState('login');

  const { 
    user,
    loginWithGoogle,
    login, 
    register, 
    setDatosUsuarioActual, 
    datosUsuarioActual, 
    traerDatosDeUsuarioActual, 
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const redireccionarUsuario = () => {
      if (datosUsuarioActual && Object.keys(datosUsuarioActual).length !== 0) {
        if (datosUsuarioActual.role === 'cliente') {
          navigate('/usuario');
        } else if (datosUsuarioActual.role === 'admin') {
          navigate('/admin');
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
  e.preventDefault();
  await register(emailRegister, passwordRegister);

  setIsLoading(true);

  // Esperar a que se registre el usuario
  await new Promise((resolve) => setTimeout(resolve, 3000));

};


const hanldeGoogle = async (e) => {
  e.preventDefault();
  await loginWithGoogle();
  setIsLoading(true);
};

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
        {form === 'login' ? (
          <Login setIsLoading={setIsLoading} login={login} />
        ) : (
          <Register  setEmailRegister={setEmailRegister} setPasswordRegister={setPasswordRegister} handleRegister={handleRegister} />
        )}
        <PantallaCargando isLoading={isLoading} />
      </article>
    </section>
  </main>
);

// ...
}