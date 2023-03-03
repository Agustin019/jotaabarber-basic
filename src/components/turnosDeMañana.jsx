import { useEffect, useState } from "react";
import { diasDisponibles } from "../utils/maxDiasLaborales";
import { doc, getDoc } from 'firebase/firestore'
import { db } from "../utils/firebaseconfig";
import { ClipLoader } from "react-spinners";
import Turno from "./turno";

export default function TurnosDeMañana({ loading, setLoading }) {

    const [turnos, setTurnos] = useState([])
    const diaDeMañana = diasDisponibles[1]
    console.log(diaDeMañana)

    useEffect(() => {
        const obtenerTurnosDelDiaSiguiente = async () => {
            setLoading(true)
            const docref = doc(db, 'Turnos', diaDeMañana)
            const turnosDeMañana = await getDoc(docref)
            const turnosArray = turnosDeMañana.data().turnos
            setTurnos(turnosArray)
            setLoading(false)
        }
        obtenerTurnosDelDiaSiguiente()
    }, [])
    return (
        <article>
            {
                !turnos.length
                ? <h2 className="text-center text-xl py-8 text-teal-500 font-bold">No hay turnos para mañana</h2>
                : (
                    <>
                        <h2 className="text-center text-xl py-8 text-teal-500 font-bold">Turnos para mañana</h2>
                        {turnos.map( turno => <Turno key={turno.hora} turno={turno} /> )}
                    </>
                )
            }
             <div className='w-full flex justify-center mt-10'>
                <ClipLoader loading={loading} />
            </div>
        </article>
    )
}
