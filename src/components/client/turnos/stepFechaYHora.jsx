import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {generarDocumentoPorCadaDiaDisponible, generarDocumentoPorCadaDiaDeTurnosDisponible } from '../../../utils/horariosLaborales'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';
import Turnos from './turnos';


export default function StepFechaYHora({ fechaSeleccionada, setFechaSeleccionada }) {
  // turnos
  const [turnos, setTurnos] = useState([])
  const [periodoTurno, setPeriodoTurno] = useState('mañana')
  const filtrarTurnosPorPeriodo = turnos.filter(turno => turno.periodo === periodoTurno)
  
  // calendario
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  
  let currentDate = new Date();
  if (!(currentDate instanceof Date && !isNaN(currentDate))) {
    currentDate = new Date();
  }
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(monthsOfYear[selectedDay.getMonth()]);
  const diaAbreviado = daysOfWeek[selectedDay.getDay()].slice(0, 3);

  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const currentWeekStart = new Date(currentDate.getFullYear(), currentMonth, currentDate.getDate() - currentDay);
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(currentWeekStart);
  const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);

  useEffect(() => {
    let middleDate;
    if (window.innerWidth >= 1024) {
      middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 5);
    } else if (window.innerWidth >= 768) {
      middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 3);
    } else if ((window.innerWidth <= 768)) {
      middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 2);
    }
    
    if (selectedDay >= currentWeekStartDay && selectedDay <= middleDate) {
      setSelectedMonth(monthsOfYear[middleDate.getMonth()]);
      setSelectedDay(selectedDay);
    } else {
      setSelectedMonth(monthsOfYear[middleDate.getMonth()]);
      setSelectedDay(middleDate);
    }
  }, [currentWeekStartDay, selectedDay]);
  

  useEffect(() => {
    handleDayClick(currentDate)
  }, [])

  const fechaFormateada = format(selectedDay, 'dd-MM');

  const handleDayClick = (day) => {
    setFechaSeleccionada({})
    setSelectedDay(day);
    setSelectedMonth(monthsOfYear[day.getMonth()]);
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const diff = Math.floor((day - prevWeekStartDay) / (24 * 60 * 60 * 1000));
      let newWeekStart;
      if (window.innerWidth >= 1280) {
        newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + diff - 5);
      } else if (window.innerWidth >= 768) {
        newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + diff - 3);
      } else if ((window.innerWidth <= 768)) {
        newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + diff - 2);
      }
      return newWeekStart;
    });
  };
  const handlePrevWeek = () => {
    if (selectedDay.toDateString() === currentDate.toDateString()) {
      return; // No retroceder si el día seleccionado es el día actual
    }
  
    setFechaSeleccionada({});
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() - 4);
      const maxPrevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      const minPrevDate = new Date(maxPrevDate.getFullYear(), maxPrevDate.getMonth(), maxPrevDate.getDate() - 6);
  
      if (newWeekStart >= minPrevDate) {
        return newWeekStart;
      } else {
        return minPrevDate;
      }
    });
  };
  
  
  const handleNextWeek = () => {
    if (selectedDay.toDateString() === thirtyDaysLater.toDateString()) {
      return; // No avanzar si el día seleccionado es la fecha máxima
    }
  
    setFechaSeleccionada({});
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + 4);
      const nextWeekEnd = new Date(newWeekStart.getFullYear(), newWeekStart.getMonth(), newWeekStart.getDate() + 6);
      const maxNextDate = new Date(thirtyDaysLater.getFullYear(), thirtyDaysLater.getMonth(), thirtyDaysLater.getDate() - 6);
      if (nextWeekEnd <= thirtyDaysLater && nextWeekEnd <= maxNextDate) { // Cambio aquí
        return newWeekStart;
      } else if (prevWeekStartDay <= thirtyDaysLater && maxNextDate <= thirtyDaysLater) { // Cambio aquí
        return maxNextDate;
      } else {
        return prevWeekStartDay;
      }
    });
  }

  const renderCalendar = () => {
    const calendar = [];
    const startDate = new Date(currentWeekStartDay);
    const thirtyDaysLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 30
    );
  
    let visibleDaysCount;
    if (window.innerWidth >= 1280) {
      visibleDaysCount = 11;
    } else if (window.innerWidth >= 768) {
      visibleDaysCount = 7;
    } else {
      visibleDaysCount = 5;
    }
  
    const middleIndex = Math.floor(visibleDaysCount / 2);
    const startIndex = Math.max(0, middleIndex - Math.floor(visibleDaysCount / 2));
    const endIndex = startIndex + visibleDaysCount;
  
    let selectedDayIndex = middleIndex;
  
    if (selectedDay) {
      const currentDateIndex = Math.floor((selectedDay - startDate) / (1000 * 60 * 60 * 24));
      if (currentDateIndex >= startIndex && currentDateIndex < endIndex) {
        selectedDayIndex = currentDateIndex - startIndex;
      }
    }
  
    for (let i = startIndex; i < endIndex; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      const day = date.getDate();
      const dayName = daysOfWeek[date.getDay()].slice(0, 3);
      const isSelectedDay = selectedDay && date.toDateString() === selectedDay.toDateString();
      const isMiddleDay = i - startIndex === selectedDayIndex && isSelectedDay;
      const isSelectable = date >= currentDate && date <= thirtyDaysLater;
  
      const dayClassNames = `py-2 px-4 flex flex-col items-center gap-2 sm:gap-3 rounded-lg w-[58px] h-[70px] sm:w-[63px]  sm:h-[76px]   
      ${isSelectedDay ? 'border border-[#1e1e1e]' : ''
        } ${isSelectedDay && isMiddleDay ? 'bg-[#1e1e1e] text-white' : isMiddleDay ? 'bg-[#1e1e1e] text-white' : ''} 
        ${!isSelectable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `;
  
      calendar.push(
        <div
          key={i}
          className={dayClassNames}
          onClick={() => isSelectable && handleDayClick(date)}
        >
          <div>{day}</div>
          <div>{dayName}</div>
        </div>
      );
    }
  
    return (
      <div className="flex gap-1 ">
        {calendar}
      </div>
    );
  };
  

  const [viewType, setViewType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newViewType = '';

      if (screenWidth >= 1280) {
        newViewType = 'desktop';
      } else if (screenWidth >= 768) {
        newViewType = 'tablet';
      } else {
        newViewType = 'mobile';
      }

      if (newViewType !== viewType) {
        setViewType(newViewType);
        // Aquí puedes ejecutar la función específica para cada tipo de vista
        console.log('Vista cambiada a:', newViewType);
        handleDayClick(selectedDay)
      }
    };

    handleResize(); // Verificar el estado inicial al cargar la página

    window.addEventListener('resize', handleResize); // Agregar el evento de escucha

    return () => {
      window.removeEventListener('resize', handleResize); // Eliminar el evento de escucha al desmontar el componente
    };
  }, [viewType]);



  generarDocumentoPorCadaDiaDisponible()
  generarDocumentoPorCadaDiaDeTurnosDisponible()



  /*  consultar ´por los turnos disponibles segun el dia de hoy o la fecha seleccionada  */

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'horarios', fechaFormateada), (doc) => {
      setTurnos(doc.data()?.horariosLaborales ?? []);
      console.log(turnos)
    });

    return () => unsubscribe()
  }, [selectedDay])

  return (
    <div className='w-full flex flex-col gap-y-3 md:gap-y-10'>
      <div>
        <h2 className="text-xl my-2 md:my-5 text-center font-bold">{selectedMonth} 2023</h2>
        <div className="flex items-center justify-around">
          <button className="text-xl" onClick={handlePrevWeek}><ion-icon name="arrow-back"></ion-icon></button>
          <div >{renderCalendar()}</div>
          <button className="text-xl" onClick={handleNextWeek}><ion-icon name="arrow-forward"></ion-icon></button>
        </div>
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