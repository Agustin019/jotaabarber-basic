import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebaseconfig';

export default function ModalProfesionales({ handleModal }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [servicios, setServicios] = useState([])

  useEffect(() => {
    const consultarServicios = async () => {
      const docRef = doc(db, 'utilidades', 'servicios')
      const serviciosDoc = await getDoc(docRef)
      setServicios(serviciosDoc.data().servicio)
    }
    consultarServicios()
  })


  // Manejo de imagenes

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = () => {
    setSelectedImage(null);
    document.getElementById('imageInput').click();
  };

  return (
    <main className='h-screen w-screen fixed left-0 pl-[250px] bg-[#474747]/40 flex flex-col items-center justify-center'>
      {/* Modal */}
      <section className='w-[636px] h-[642px] rounded-xl py-8 px-6 bg-[#474747] flex flex-col'>
        {/* Contenido del modal */}
        <article className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl text-[#FDFFFC] '>Nuevo Profesional</h2>
          <button onClick={handleModal}>
            <img src="https://i.ibb.co/18mdwKB/close.png" alt="" />
          </button>
        </article>

          {/** contenedor cmapos */}
        <article className='flex flex-col'>
          <div className='flex flex-col h-[407px] gap-y-6'>
            <div>
              {/** COntenedor campo imagen */}
              <p className='text-[#FDFFFC] font-semibold text-base py-4 mt-3'>Foto del profesional</p>
              <div
                className={`w-[588px] h-[120px] rounded-lg bg-[#474747] border-[#CAC7C7] border flex items-center justify-center ${dragging ? 'border-4 border-blue-500' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {!selectedImage ? (
                  <div className='flex flex-col gap-y-3 items-center'>
                    <img src="https://i.ibb.co/s6yHR7K/Vector-2.png" alt="Icono imagen" />
                    <label htmlFor="imageInput" className="cursor-pointer text-[#FDFFFC] font-light text-[10px]">
                      Sube o arrastra el archivo. Puede ser .jpg o .png
                    </label>
                  </div>
                ) : (
                  <img src={selectedImage} alt="Selected" className="max-w-full max-h-full" />
                )}
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {!selectedImage && (
                <p className="text-sm font-light text-[#FDFFFC] text-center py-4">Sin archivo seleccionado</p>
              )}
              {selectedImage && (
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handleImageChange}
                >
                  Cambiar imagen
                </button>
              )}
            </div>
            {/* Campo Nombre */}
            <div className='flex flex-col gap-y-3'>
              <label className='font-semibold text-base text-[#FDFFFC] ' htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id='nombre'
                className='p-4 rounded-xl border border-[#d9d9d9] bg-transparent  font-light text-[#FDFFFC] outline-none'
                placeholder='Nombre del profesional'
              />
            </div>


            { /*  Campo de serviicos a cargo */}
            <div className='flex flex-col gap-y-3 '>
              <label className='font-semibold text-base text-[#FDFFFC]'>Servicios a cargo</label>
              <div className='flex justify-between'>
                {
                  servicios?.map(servicio =>
                    <div key={servicio.nombre} className='flex gap-2'>
                      <label className='font-light text-sm text-[#FDFFFC] ' htmlFor={servicio.nombre}>{servicio.nombre}</label>
                      <input
                        type="checkbox"
                        id={servicio.nombre}
                        className='p-4 rounded-xl border-none bg-transparent  font-light outline-none'
                      //placeholder='Nombre del profesional'
                      />
                    </div>

                  )
                }
              </div>
            </div> {/* campo servicios */}
          </div> {/* contenedor campos  */}


        </article> {/* conntenido  modal */}

         <article className='flex justify-center mt-20'>
           <button className='w-[282px] rounded-lg bg-[#ffffff] py-[15px] px-6 font-semibold text-[#1E1E1E] text-base'>
             Agregar Profesional
           </button>
           
         </article>
      </section> {/* Modal */}


      {/* contenedor principal */}
    </main>
  );
}
