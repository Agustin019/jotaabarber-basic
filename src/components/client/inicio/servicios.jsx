import { useEffect, useState } from 'react'
import { db } from '../../../utils/firebaseconfig'
import { doc, getDoc } from 'firebase/firestore'


export default function Servicios() {

    const [servicios, setServicios] = useState([])

    useEffect(() => {

        const consultarServicios = async () => {
            const docRef = doc(db, 'utilidades', 'servicios')
            const serviciosDoc = await getDoc(docRef)
            setServicios(serviciosDoc.data().servicio)
        }
        return () => consultarServicios()

    }, [])

    return (
        <section className='h-auto lg:h-[90vh] '>
            <article className='flex flex-col items-center my-10 gap-y-5 '>
                <h2 className='font-bold text-[32px] text-center'>Servicios</h2>
                <p className='font-light text-sm text-center lg:w-[80%] lg:mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit rem fugiat earum ducimus aperiam, ea dolorum, natus, autem qui mollitia iure unde deserunt exercitationem et dolorem suscipit maxime perspiciatis accusamus!
                </p>
            </article>
            <article className='grid md:grid-cols-2 w-[90%] lg:w-[80%] xl:w-[70%] place-items-center mx-auto gap-y-3'>
                {
                    servicios.length !== 0
                        ? servicios.map(servicio =>
                            <div
                                key={servicio.nombre}
                                className='relative w-[328px] h-[320px] xl:w-[503px] lg:h-[320px]'
                            >

                                <img
                                    src={servicio.img}
                                    className='w-[328px] h-[320px] xl:w-[503px] lg:h-[320px] object-cover rounded-2xl'
                                    alt={`imagen del servicio ${servicio.nombre}`} />

                                  <div className=' flex flex-col justify-end p-5
                                    w-full h-[100px] bg-gradient-to-t from-black to-transparent absolute bottom-0 text-white 
                                    font-semibold  rounded-b-2xl'>
                                    <p className='font-bold text-2xl text-[#D9D9D9]'>{servicio.nombre}</p>
                                </div>  
                            </div>
                        )
                        : ''
                }
            </article>
        </section>
    )
}
