import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { generarDocumentoPorCadaDiaDisponible } from '../../utils/horariosLaborales'

export default function SteoFechaYHora() {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  let currentDate = new Date();
  if (!(currentDate instanceof Date && !isNaN(currentDate))) {
    currentDate = new Date();
  }
  currentDate.setHours(0, 0, 0, 0);  
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(monthsOfYear[selectedDay.getMonth()]);
 



  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const currentWeekStart = new Date(currentDate.getFullYear(), currentMonth, currentDate.getDate() - currentDay);
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(currentWeekStart);
  const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);

  useEffect(() => {
    const middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 3);
    setSelectedMonth(monthsOfYear[middleDate.getMonth()]);
  }, [currentWeekStartDay]);
  
  const fechaFormateada = format(selectedDay, 'dd/MM');
  console.log(fechaFormateada)

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedMonth(monthsOfYear[day.getMonth()]);
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const diff = Math.floor((day - prevWeekStartDay) / (24 * 60 * 60 * 1000));
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + diff - 3);
      return newWeekStart;
    });
  };
  const handlePrevWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() - 4);
      const maxPrevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const minPrevDate = new Date(maxPrevDate.getFullYear(), maxPrevDate.getMonth(), maxPrevDate.getDate() - 3);
      if (newWeekStart < minPrevDate) {
        return minPrevDate;
      } else if (newWeekStart <= thirtyDaysLater) {
        return newWeekStart;
      } else {
        return maxPrevDate;
      }
    });
  };
    
  
  const handleNextWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + 4);
      const nextWeekEnd = new Date(newWeekStart.getFullYear(), newWeekStart.getMonth(), newWeekStart.getDate() + 6);
      const maxNextDate = new Date(thirtyDaysLater.getFullYear(), thirtyDaysLater.getMonth(), thirtyDaysLater.getDate() - 6);
      if (nextWeekEnd <= thirtyDaysLater) {
        return newWeekStart;
      } else if (prevWeekStartDay <= thirtyDaysLater) {
        return maxNextDate;
      } else {
        return prevWeekStartDay;
      }
    });
  };
  const renderCalendar = () => {
    const calendar = [];
    const startDate = new Date(currentWeekStartDay);
    const middleDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 3);
    const thirtyDaysLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      const day = date.getDate();
      const dayName = daysOfWeek[date.getDay()].slice(0, 3);
      const isCurrentDay = date.toDateString() === currentDate.toDateString();
      const isMiddleDay = date.toDateString() === middleDate.toDateString();
      const isSelectable = date >= currentDate && date <= thirtyDaysLater;
  
      const dayClassNames = `py-2 px-4 mx-2 flex flex-col items-center gap-3 rounded-lg w-[63px] h-[76px] ${
        isCurrentDay ? 'border border-[#1e1e1e]' : ''
      } ${
        isCurrentDay && isMiddleDay ? 'bg-[#1e1e1e] text-white' : isMiddleDay ? 'bg-[#1e1e1e] text-white' : ''
      } ${!isSelectable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;
  
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
  
    return calendar;
  };
  
  generarDocumentoPorCadaDiaDisponible()
  // const availableDates = [];
  // for (let date = currentDate; date <= thirtyDaysLater; date.setDate(date.getDate() + 1)) {
  //   if (date.getDay() !== 0) { // Verificar si el día no es domingo (0: domingo, 1: lunes, ..., 6: sábado)
  //     const formattedDate = format(date, 'dd-MM');
  //     availableDates.push(formattedDate);
  //   }
  // }
  // console.log(availableDates)

  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-8'>
      <h2 className="text-xl font-bold">{selectedMonth} 2023</h2>
      <div className="flex items-center justify-center">
        <button className="text-xl" onClick={handlePrevWeek}><ion-icon name="arrow-back"></ion-icon></button>
        <div className="flex">{renderCalendar()}</div>
        <button className="text-xl" onClick={handleNextWeek}><ion-icon name="arrow-forward"></ion-icon></button>
      </div>
    </div>
  );
};

