import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'
import { diasDisponibles } from '../utils/maxDiasLaborales'


import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';

import { horariosLaborales } from '../utils/horariosLaborales';
import { db } from '../utils/firebaseconfig';
import { maxDate3, shouldDisableDate, obtenerHorasDisponibles } from '../utils/calendarFunctions';




export default function Calendar({ 
    horarios,
    setHorarios,
    value,
    setValue,
    loading,
    setLoading,
    hora,
    setHora
    }) {

    const [selectedDate, handleDateChange] = React.useState(moment())
    

    async function handleChange(date) {
        const fecha = date.format('DD-MM');
        setValue(fecha)

        const timePickerFecha = moment(fecha, 'DD-MM');
        handleDateChange(timePickerFecha);
    }
    async function generarDocumentoPorCadaDiaDisponible() {
        for (let i = 0; i < diasDisponibles.length; i++) {
            const fecha = diasDisponibles[i];
            const docRef = doc(db, 'horarios', fecha);
            try {
                const documento = await getDoc(docRef)
                if (!documento.exists()) {
                    await setDoc(docRef, { horariosLaborales })
                }
            } catch (e) {
                console.log(`Error en la fecha ${fecha}`, e)
            }

        }
    }
    let turnos = [] 
    async function generarDocumentoPorCadaDiaDeTrunos() {
        for (let i = 0; i < diasDisponibles.length; i++) {
            const fecha = diasDisponibles[i];
            const docRef = doc(db, 'Turnos', fecha);
            try {
                const documento = await getDoc(docRef)
                if (!documento.exists()) {
                    await setDoc(docRef, { turnos })
                }
            } catch (e) {
                console.log(`Error en la fecha ${fecha}`, e)
            }

        }
    }
    generarDocumentoPorCadaDiaDisponible()
    generarDocumentoPorCadaDiaDeTrunos()
    const horasDisponibles = obtenerHorasDisponibles(horarios)
    
    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(doc(db, "horarios", value), (doc) => {
            const newData =  doc.data().horariosLaborales
            setHorarios(newData)
          });
          setLoading(false)
        return () => {
            unsub();
        };
    }, [selectedDate])
   
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    name='fecha'
                    id='fecha'
                    label="Selecciona la fecha"
                    renderInput={(params) => <TextField {...params} value={selectedDate}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }} />}
                    value={selectedDate}
                    onChange={date => handleChange(date)}
                    minDate={moment()}
                    maxDate={maxDate3(13)}
                    shouldDisableDate={shouldDisableDate}
                />
            </LocalizationProvider>
            
            { 
                
                !loading ?
                    (
                        <>
                            <p className={`text-sm font-medium ${horasDisponibles.length < 4 ? 'text-yellow-400' : 'text-green-500'}`}>{horasDisponibles.length < 4 ? '¡Ultimos Lugares!' : 'Hay lugares'}</p>
                            <select
                                id="hora"
                                name='hora'
                                value={hora}
                                onChange={e => setHora(e.target.value)}
                                className='py-3 px-5 border border-slate-300 '
                            >
                                <option value="">Selecciona la hora</option>
                                {
                                    horasDisponibles.map(hora => (
                                        <option key={hora} value={hora}>{hora}</option>
                                    ))
                                }
                            </select>
                        </>
                    ) : ''

            }
        </>
    );
}