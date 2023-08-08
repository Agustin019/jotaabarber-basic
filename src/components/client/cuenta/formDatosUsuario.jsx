import { useState, useEffect } from 'react'

import { db } from '../../../utils/firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth'

import { useAuth } from '../../../context/authContext';

import { toast } from 'react-toastify';

export default function FormDatosUsuario({ datosUsuario }) {

    const { datosUsuarioActual, traerDatosDeUsuarioActual, user } = useAuth()
    const [fullName, setFullName] = useState(datosUsuario.fullName);
    const [email, setEmail] = useState('');


    // estados para cambiar la contraseña
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    const actualizarContrasena = async (e) => {
        e.preventDefault();
    
        if (newPassword !== repeatPassword) {
          // Mostrar un mensaje de error si las contraseñas no coinciden
          toast.error('Las contraseñas no coinciden','error');
          return;
        }
    
        try {
          await updatePassword(user, newPassword);
          console.log('Contraseña actualizada exitosamente');
          // Agrega aquí la lógica para mostrar una notificación o mensaje de éxito
        } catch (error) {
          console.error('Error al actualizar la contraseña:', error.message);
          // Agrega aquí la lógica para mostrar una notificación o mensaje de error
        }
      };


      const actualizarDatosDeUsuario = async (e) => {
        e.preventDefault();
      
        try {
          const userRef = doc(db, 'usuarios', datosUsuarioActual?.uid);
          const docUser = await getDoc(userRef);
          const userData = docUser.data();
      
          if (fullName) {
            userData.fullName = fullName;
          }
      
          // Actualizar la contraseña solo si se proporciona una nueva contraseña
          if (newPassword !== '') {
            if (newPassword !== repeatPassword) {
              toast.error('Las contraseñas no coinciden', 'error');
              return;
            }
            if (newPassword.length < 6) {
                toast.error('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
      
            // Actualizar la contraseña
            await updatePassword(user, newPassword);
            console.log('Contraseña actualizada exitosamente');
          }
      
          // Actualizar otros datos del usuario si es necesario
          await updateDoc(userRef, userData);
      
          console.log('Datos actualizados exitosamente');
          toast.success('Datos actualizados correctamente');
          window.location.reload();
        } catch (error) {
          console.error('Error al actualizar los datos del usuario:', error.message);
        }
      };
    
    return (
        <form
            className='w-[90%] mx-auto flex flex-col gap-y-6 pt-5'
            onSubmit={actualizarDatosDeUsuario}
        >
            <div className="form__group  ">
                <input
                    type="text"
                    className="form__field "
                    defaultValue={datosUsuario.fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Input"
                    id='fullname'
                    required
                />
                <label className="form__label " htmlFor='fullname'>
                    Nombre y apellido
                </label>
            </div>
            <div className="form__group  ">
                <input
                    type="text"
                    className="form__field field-disabled"
                    defaultValue={datosUsuario.email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Input"
                    id='email'
                    disabled
                    required
                />
                <label className="form__label " htmlFor='email' >
                    Email
                </label>
            </div>
            {/* <div className="form__group  ">
        <input
            type="number"
            className="form__field "
            // onChange={e => setFullName(e.target.value)}
            placeholder="Input"
            id='fullname'
            required
        />
        <label className="form__label " htmlFor='fullname'>
            Telefono
        </label>
    </div> */}

            {/* Contraseña  */}
            <div className='flex flex-col gap-y-3 pt-10 pb-5 text-blancoSecundario'>
                <h3 className='font-bold text-[20px]'> Contraseña</h3>
                <p className='font-light text-base'>Si no deseas cambiar la contraseña, mantene los campos en blanco</p>
            </div>
            <div className="form__group  ">
                <input
                    type="password"
                    className="form__field "
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Input"
                    id='fullname'

                />
                <label className="form__label " htmlFor='fullname'>
                    Contraseña
                </label>
            </div>
            <div className="form__group  ">
                <input
                    type="password"
                    className="form__field "
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    placeholder="Input"
                    id='fullname'
                />
                <label className="form__label " htmlFor='fullname'>
                    Repetir contraseña
                </label>
            </div>

            <input
                type="submit"
                value="Guardar cambios"
                className='w-[197px] py-3 px-6 text-negroPrincipal font-bold text-base bg-amarillo rounded-lg cursor-pointer uppercase flex justify-center items-center'
            />
        </form>
    )
}
