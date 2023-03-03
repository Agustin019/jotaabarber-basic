import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'
import moment from 'moment'
import Turno from './turno'
import { ClipLoader } from 'react-spinners'


export default function TurnosDeHoy({ loading, setLoading }) {

    const [turnos, setTurnos] = useState([])

    const fechaActual = moment()
    const diaActual = fechaActual.format('DD-MM')

    useEffect(() => {
        async function obtenerTurnosDelDiaActual() {
            setLoading(true)
            const docRef = doc(db, 'Turnos', diaActual)
            const docSnap = await getDoc(docRef)
            const nuevaConsulta = docSnap.data().turnos
            setTurnos(nuevaConsulta)
            setLoading(false)
        }
        obtenerTurnosDelDiaActual()
    }, [])
    return (
        <article >
            {!turnos.length
                ? <h2 className='text-center text-xl text-teal-500 font-medium py-8'>¡No hay turnos para este dia!</h2>
                : (
                    <>
                     <h2 className='text-center text-xl text-teal-500 font-medium py-8'>Turnos del dia de hoy</h2>
                     {turnos.map(turno => <Turno key={turno.hora} turno={turno} />)}
                    </>
                )

            }
            <div className='w-full flex justify-center mt-10'>
                <ClipLoader loading={loading} />
            </div>
        </article>
    )
}
