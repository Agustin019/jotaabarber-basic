import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TurnosDeOtrosDias() {

    const [turnosDiaSeleccionado, setTurnosDiaSeleccionado] = useState([])

    return (
        <article className='mt-20'>
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
        </article>
    )
}
