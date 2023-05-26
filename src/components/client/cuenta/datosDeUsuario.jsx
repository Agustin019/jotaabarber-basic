import React, { useRef } from 'react';
import { db, storage } from '../../../utils/firebaseconfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DatosDeUsuario({ datosUsuarioActual }) {
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
        <article className="flex flex-col gap-y-5">
            <div className="flex gap-x-5">
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
        </article>
    );
}
