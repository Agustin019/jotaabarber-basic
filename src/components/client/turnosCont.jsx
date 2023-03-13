import { useState, useEffect } from 'react';
import moment from 'moment';
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { dias } from '../../utils/helpers'
import Button from '../button';

import TurnosDeHoy from './turnosDeHoy';
import TurnosDeMañana from './turnosDeMañana';
import TurnosDeOtrosDias from './turnosDeOtrosDias';
import { ClipLoader } from 'react-spinners';

import Horarios from './horarios';



export default function TurnosCont({ fecha, setFecha, hora, setHora, loading, setLoading }) {
    

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
        <section className='w-full'>
            <article className='w-full flex justify-center gap-x-10 my-16'>
                {
                    dias.map(dia =>
                        <Button key={dia.id} dia={dia} button={button} setButton={setButton} />
                    )
                }
            </article>



            <div id='turnos' className='flex flex-col gap-y-7 items-center '>
                {mostrarComponente()}
                <ClipLoader loading={loading} />
                {!loading ? <Horarios horarios={horarios} setHora={setHora} /> : ''}

            </div>

            <div id='elemento-id' className=''>

            </div>

        </section>
    )
}
