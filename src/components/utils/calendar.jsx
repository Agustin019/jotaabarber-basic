import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'
import { diasDisponibles } from '../../utils/maxDiasLaborales'


import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { setDoc, doc, getDoc } from 'firebase/firestore';

import { horariosLaborales } from '../../utils/horariosLaborales';
import { db } from '../../utils/firebaseconfig';
import { maxDate3, shouldDisableDate } from '../../utils/calendarFunctions';


export default function Calendar({ selectedDate, handleDateChange, setFecha }) {
// , setHorarios, fecha, setFecha, setLoading
    
    

    // async function handleChange(date) {
    //     setLoading(true)
    //     const fechaSeleccionada = date.format('DD-MM');
    //     setFecha(fechaSeleccionada)

    //     const timePickerFecha = moment(fechaSeleccionada, 'DD-MM');
    //     handleDateChange(timePickerFecha);
    //     setLoading(false)
    // }
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

    // Genera un documento con un arreglo vacio llamado "turnos" por cada dia de turnos disponible
    let turnos = [] 
    async function generarDocumentoPorCadaDiaDeTurnos() {
        for (let i = 0; i < diasDisponibles.length; i++) {
            const fechaDoc = diasDisponibles[i];
            const docRef = doc(db, 'Turnos', fechaDoc);
            try {
                const documento = await getDoc(docRef)
                if (!documento.exists()) {
                    await setDoc(docRef, { turnos })
                }
            } catch (e) {
                console.log(`Error en la fechaDoc ${fechaDoc}`, e)
            }

        }
    }
  //  generarDocumentoPorCadaDiaDisponible()
    //generarDocumentoPorCadaDiaDeTurnos()
    
  

    const handleChange = (date) => {
        setFecha(date.format('DD-MM'))
        handleDateChange(date)
    }
   
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
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

        </>
    );
}