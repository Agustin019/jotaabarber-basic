import React, { useRef } from 'react';
import { useAuth } from '../../context/authContext';

import { db, storage } from '../../utils/firebaseconfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer'

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
        <>
            <Navbar />
            {/* <article className="flex flex-col gap-y-5 w-[80%] ml-[20%] mt-20"> */}
            <main className='flex flex-col md:flex-row gap-x-5 my-20 w-full'>
                <section className='md:w-[20%]'>
                    <article>
                        <h2 className='font-bold text-2xl p-8 text-blancoSecundario'>¡Bienvenido, {datosUsuarioActual?.fullName?.split(' ')[0]}!</h2>
                    </article>
                    <article className="flex md:flex-col gap-x-4 justify-center px-5 ">
                        <Link
                            to="/datos"
                            className={`
                            w-[164px] h-[52px] p-4 text-lg text-center font-semibold text-blancoSecundario
                            
                            ${location.pathname === '/datos'
                                    ? 'font-semibold border-b-[5px] md:border-b-0 md:border-l-[5px] border-amarillo '
                                    : 'font-light'
                                }`}
                        >
                            Datos
                        </Link>
                        <Link
                            to="/turnos"
                            className={`
                            w-[164px] h-[52px] p-4 text-lg font-semibold text-center text-blancoSecundario
                            ${location.pathname === '/turnos'
                                    ? 'font-semibold border-b-[5px] md:border-b-0 md:border-l-[5px] border-amarillo '
                                    : 'font-light'
                                }`}
                        >
                            Turnos
                        </Link>
                    </article>
                </section>

                <section className="flex flex-col gap-y-5 md:w-[80%] py-5">
                    <article className="flex gap-x-5 w-[90%] mx-auto mt-20">
                        <div className="w-[120px] rounded-full h-[120px] flex flex-col justify-center items-center bg-[#D9D9D9] z-20">
                            {
                                datosUsuarioActual.img !== ''
                                    ? <img
                                        src={datosUsuarioActual.img}
                                        className='object-cover w-[120px] rounded-full h-[120px] '
                                        alt='Foto de perfil' />
                                    : <img
                                        src="https://i.ibb.co/YthSfQx/Vector.png"
                                        alt="icono foto de usuario"
                                    />
                            }

                        </div>

                        <div className="flex flex-col items-start justify-around">
                            <h2 className="text-2xl font-bold text-center text-blancoSecundario">
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
                                    bg-amarillo text-negroPrincipal rounded-lg font-bold text-base uppercase
                                    "
                                >
                                    <span className='text-2xl pt-1'>
                                        <ion-icon name="camera-outline"></ion-icon>
                                    </span>
                                    Cambiar foto
                                </button>
                            </div>
                        </div>
                    </article>
                    <article>
                        <div className='w-[90%] mx-auto flex flex-col justify-start gap-y-3 text-blancoSecundario'>
                            <p className='font-bold text-[20px]'>Mis Datos</p>
                            <p className='font-light font-OpenSans text-base'>Información de tu cuenta</p>
                        </div>
                        <form className='w-[90%] mx-auto flex flex-col gap-y-6 pt-5'>
                            <div className="form__group  ">
                                <input
                                    type="text"
                                    className="form__field "
                                    //onChange={e => setFullName(e.target.value)}
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
                                    className="form__field "
                                    //onChange={e => setFullName(e.target.value)}
                                    placeholder="Input"
                                    id='fullname'
                                    required
                                />
                                <label className="form__label " htmlFor='fullname'>
                                    Email
                                </label>
                            </div>
                            <div className="form__group  ">
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
                            </div>

                            {/* Contraseña  */}
                            <div className='flex flex-col gap-y-3 pt-10 pb-5 text-blancoSecundario'>
                                <h3 className='font-bold text-[20px]'> Contraseña</h3>
                                <p className='font-light text-base'>Si no deseas cambiar la contraseña, mantene los campos en blanco</p>
                            </div>
                            <div className="form__group  ">
                                <input
                                    type="text"
                                    className="form__field "
                                    // onChange={e => setFullName(e.target.value)}
                                    placeholder="Input"
                                    id='fullname'
                                    required
                                />
                                <label className="form__label " htmlFor='fullname'>
                                    contraseñs
                                </label>
                            </div>
                            <div className="form__group  ">
                                <input
                                    type="text"
                                    className="form__field "
                                    //  onChange={e => setFullName(e.target.value)}
                                    placeholder="Input"
                                    id='fullname'
                                    required
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
                    </article>
                </section>
            </main>
            <Footer />
        </>
    );
}
