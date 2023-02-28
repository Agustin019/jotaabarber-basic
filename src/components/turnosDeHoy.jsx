import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig'
import moment from 'moment'
import Turno from './turno'

export default function TurnosDeHoy() {

    const [turnos, setTurnos] = useState([])

    const fechaActual = moment()
    const diaActual = fechaActual.format('DD-MM')

    useEffect(() => {
        async function obtenerTurnosDelDiaActual() {
            const docRef = doc(db, 'Turnos', '11-03')
            const docSnap = await getDoc(docRef)
            const nuevaConsulta = docSnap.data().turnos
            console.log(nuevaConsulta)
            setTurnos(nuevaConsulta)
        }
        obtenerTurnosDelDiaActual()
    }, [])
//setHorarios(nuevaConsulta)
    return (
        <div>
           { !turnos ?
            <h2 className='text-center text-xl text-teal-500 font-medium'>¡No hay turnos para este dia!</h2>
            : 
            <div className=' mt-20 flex flex-col gap-y-5'>
               { turnos.map( turno => <Turno key={turno.hora} turno={turno}/>)}
            </div>
           }
        </div>
    )
}
