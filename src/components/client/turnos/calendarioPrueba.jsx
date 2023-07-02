import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

import Turnos from './turnos';

export default function CalendarioPrueba({ fechaSeleccionada, setFechaSeleccionada }) {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const [startDay, setStartDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(startDay);
  const fechaFormateada = format(selectedDay, 'dd-MM');

  const [turnos, setTurnos] = useState([])
  const [periodoTurno, setPeriodoTurno] = useState('mañana')
  const filtrarTurnosPorPeriodo = turnos.filter(turno => turno.periodo === periodoTurno)

  const diaAbreviado = daysOfWeek[selectedDay.getDay()].slice(0, 3);
  const [limitDays, setLimitDays] = useState(window.innerWidth <= 768 ? 5 : 10);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 640){
        setLimitDays(5)
      }else if(window.innerWidth < 1100){
        setLimitDays(7)
      }else if (window.innerWidth > 1100){
        setLimitDays(10)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'horarios', fechaFormateada), (doc) => {
      setTurnos(doc.data()?.horariosLaborales ?? []);
      console.log(turnos)
    });

    return () => unsubscribe()
  }, [selectedDay])



  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  // Generar una matriz de 10 días a partir del día de inicio
  const maxDaysAfterCurrent = 14; // Máximo número de días después del día actual

  // Generar una matriz de días a partir del día de inicio
  const days = [];
for (let i = 0; i < limitDays; i++) {
  const day = new Date(startDay);
  day.setDate(startDay.getDate() + i);
  days.push(day);
}

const handlePreviousClick = () => {
  const currentDate = new Date();
  const newStartDay = new Date(startDay);
  newStartDay.setDate(startDay.getDate() - 4);

  if (newStartDay >= currentDate) {
    setStartDay(newStartDay);
  } else {
    setStartDay(currentDate);
  }
};

const handleNextClick = () => {
  const currentDate = new Date();
  const limitDate = new Date(currentDate);
  limitDate.setDate(currentDate.getDate() + maxDaysAfterCurrent); // Límite de días después del día actual

  const newStartDay = new Date(startDay);
  newStartDay.setDate(startDay.getDate() + 4);

  if (newStartDay <= limitDate) {
    setStartDay(newStartDay);
  }
};


  const isCurrentDay = (day) => {
    const currentDate = new Date();
    return day.toDateString() === currentDate.toDateString();
  };

  const getDayAbbreviation = (day) => {
    const options = { weekday: 'short' };
    return day.toLocaleDateString('es-ES', options).substring(0, 3);
  };

  const monthOptions = { month: 'long', year: 'numeric' };
  const currentMonth = startDay.toLocaleDateString('es-ES', monthOptions);

  return (
    <div className='w-full flex flex-col gap-y-3 md:gap-y-10'>
      <div className='w-full flex justify-center items-center'>
        <p>{currentMonth}</p>
      </div>
      <div className='flex justify-around'>
        <button type='button' onClick={handlePreviousClick}>
          <ion-icon name='arrow-back'></ion-icon>
        </button>
        <div className='flex items-center gap-2'>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={` w-[58px] h-[70px] sm:w-[63px]  sm:h-[76px] cursor-pointer
              py-2 px-4 flex flex-col items-center gap-2 sm:gap-3 rounded-lg 
              ${isCurrentDay(day) ? 'border border-black' : ''} 
              ${selectedDay.toDateString() === day.toDateString() ? 'bg-black text-white' : ''}`}
            >
              <div>{day.getDate()}</div>
              <div>{getDayAbbreviation(day)}</div>
            </div>
          ))}
        </div>
        <button type='button' onClick={handleNextClick}>
          <ion-icon name='arrow-forward'></ion-icon>
        </button>
      </div>
      <Turnos
        turnos={turnos}
        periodoTurno={periodoTurno}
        setPeriodoTurno={setPeriodoTurno}
        filtrarTurnosPorPeriodo={filtrarTurnosPorPeriodo}
        selectedDay={selectedDay}
        fechaSeleccionada={fechaSeleccionada}
        setFechaSeleccionada={setFechaSeleccionada}
        diaAbreviado={diaAbreviado}
        objetoDiaSeleccionado={selectedDay}
      />
    </div>
  );
}
