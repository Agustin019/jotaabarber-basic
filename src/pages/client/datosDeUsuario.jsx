import React, { useRef } from 'react';
import { useAuth } from '../../context/authContext';

import { db, storage } from '../../utils/firebaseconfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DatosDeUsuario() {
    
    const { datosUsuarioActual } = useAuth()

    const inputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, file.name);
        const userRef = doc(db, 'usuarios', datosUsuarioActual.uid);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            console.log('Imagen subida al storage correctamente')
            const userDocSnapshot = await getDoc(userRef);
            if (userDocSnapshot.exists()) {
                await updateDoc(userRef, {
                    img: url
                });
                console.log('Campo img actualizado con la url de la imagen')
                window.location.reload()
                // Realizar operaciones adicionales si es necesario
            } else {
                console.log('El documento del usuario no existe');
            }
        } catch (error) {
            console.log(error);
            // Manejar errores
        }
    };
    const handleButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <article className="flex flex-col gap-y-5 w-[80%] ml-[20%] mt-20">
            <div className="flex gap-x-5 w-[90%] mx-auto mt-20">
                <div className="w-[120px] rounded-full h-[120px] flex flex-col justify-center items-center bg-[#D9D9D9] z-20">
                    {
                        datosUsuarioActual.img !== ''
                            ? <img src={datosUsuarioActual.img} className='object-cover w-[120px] rounded-full h-[120px]' alt='Foto de perfil' />
                            : <img
                                src="https://i.ibb.co/YthSfQx/Vector.png"
                                alt="icono foto de usuario"
                            />
                    }

                </div>

                <div className="flex flex-col items-start justify-around">
                    <h2 className="text-2xl font-bold text-center">
                        {datosUsuarioActual?.fullName}
                    </h2>
                    <div className="relative">
                        <input
                            type="file"
                            className="opacity-0 w-0 h-0"
                            ref={inputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleButtonClick}
                            className="
                                bw-[214px] h-[48px] py-3 px-6 flex justify-center items-center gap-[10px]
                                bg-black text-white font-bold text-base uppercase
                                "
                        >
                            <img src="https://i.ibb.co/R4LzjhG/photo-camera.png" alt="" />
                            Cambiar foto
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-[90%] mx-auto flex flex-col justify-start gap-y-3 '>
                <p className='font-bold text-2xl'>Mis Datos</p>
                <p className='font-light text-base'>Información de tu cuenta</p>
            </div>
            <div className='w-[90%] mx-auto flex flex-col gap-y-6'>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="fullname">Nombre y apellido</label>
                    <input 
                        id="fullname"
                        type="text" 
                        name="Nombre y apellido" 
                        placeholder='Nombre y apellido'
                        className='w-full h-[46px] border border-[#2d2d2d] rounded-lg py-3 px-4'
                        />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="Email">Email</label>
                    <input 
                        id="Email"
                        type="email" 
                        name="Email" 
                        placeholder='Email'
                        className='w-full h-[46px] border border-[#2d2d2d] rounded-lg py-3 px-4'
                        />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="Telefono">Telefono</label>
                    <input 
                        id="Telefono"
                        type="text" 
                        name="Telefono" 
                        placeholder='Telefono'
                        className='w-full h-[46px] border border-[#2d2d2d] rounded-lg py-3 px-4'
                        />
                </div>
                
            </div>
        </article>
    );
}
