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
            const docRef = doc(db, 'Turnos', '11-03')
            const docSnap = await getDoc(docRef)
            const nuevaConsulta = docSnap.data().turnos
            console.log(nuevaConsulta)
            setLoading(false)
            setTurnos(nuevaConsulta)
        }
        obtenerTurnosDelDiaActual()
    }, [])
    return (
        <div className='mt-20'>
            {!turnos.length ?
                <h2 className='text-center text-xl text-teal-500 font-medium'>¡No hay turnos para este dia!</h2>
                :
                <div className='  flex flex-col gap-y-5 items-center'>
                    <h2 className='text-center text-xl text-teal-500 font-medium'>Turnos del dia de hoy</h2>
                    {turnos.map(turno => <Turno key={turno.hora} turno={turno} />)}
                </div>
            }
            <div className='w-full flex justify-center mt-10'>
                <ClipLoader loading={loading} />
            </div>
        </div>
    )
}
