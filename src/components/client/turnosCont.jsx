import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { dias } from '../../utils/helpers'
import Button from '../button';

import TurnosDeHoy from './turnosDeHoy';
import TurnosDeMañana from './turnosDeMañana';
import TurnosDeOtrosDias from './turnosDeOtrosDias';
import { ClipLoader } from 'react-spinners';

import Horarios from './horarios';



export default function TurnosCont({
    fecha,
    setFecha,
    hora,
    setHora,
    loading,
    setLoading,
    step,
    setModal,
    prevStep
}) {


    const [button, setButton] = useState('Hoy')
    const [horarios, setHorarios] = useState([])

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(doc(db, 'horarios', fecha), (doc) => {
            setHorarios(doc.data()?.horariosLaborales ?? []);
        });
        setLoading(false)
        return () => unsubscribe();
    }, [fecha]);


    const mostrarComponente = () => {
        switch (button) {
            case 'Hoy':
                return <TurnosDeHoy setFecha={setFecha} setLoading={setLoading} />;

            case 'Mañana':
                return <TurnosDeMañana fecha={fecha} setFecha={setFecha} loading={loading} setLoading={setLoading} hora={hora} setHora={setHora} />;

            case 'Otro dia':
                return <TurnosDeOtrosDias loading={loading} setLoading={setLoading} fecha={fecha} setFecha={setFecha} setHora={setHora} />;

            default: return <TurnosDeHoy setFecha={setFecha} setLoading={setLoading} />
        }
    }
    return (
        <section className='w-[90%] md:w-[80%] mx-auto min-h-screen relative'>
            <div className="absolute left-0 top-32 sm:top-40 ">
                <div
                 className='
                 flex justify-center items-center gap-x-1 p-2 
                 text-xs text- font-normal  text-blue-700 underline 
                 uppercase cursor-pointer hover:text-blue-900'
                 onClick={prevStep}
                >
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    <p>volver a servicios</p>
                </div>
            </div >
            <article className='w-full flex flex-col'>
                <h2 className='text-center text-2xl font-medium text-slate-800 uppercase'>¿Para Cuando?</h2>
                <div className='w-full flex justify-center gap-x-10 my-10'>
                    {
                        dias.map(dia =>
                            <Button key={dia.id} dia={dia} button={button} setButton={setButton} />
                        )
                    }
                </div>
            </article>

            <div className='flex flex-col gap-y-7 '>
                {mostrarComponente()}
                <ClipLoader loading={loading} />
                {!loading ? <Horarios setModal={setModal} horarios={horarios} setHora={setHora} /> : ''}

            </div>

        </section >
    )
}
