import React, { useState, useEffect } from 'react';

export default function SteoFechaYHora() {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(monthsOfYear[selectedDay.getMonth()]);

  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const currentWeekStart = new Date(currentDate.getFullYear(), currentMonth, currentDate.getDate() - currentDay);
  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(currentWeekStart);

  useEffect(() => {
    const middleDate = new Date(currentWeekStartDay.getFullYear(), currentWeekStartDay.getMonth(), currentWeekStartDay.getDate() + 3);
    setSelectedMonth(monthsOfYear[middleDate.getMonth()]);
  }, [currentWeekStartDay]);

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
      return newWeekStart;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + 4);
      return newWeekStart;
    });
  };
  const renderCalendar = () => {
    const calendar = [];
    const startDate = new Date(currentWeekStartDay);
    const currentMonthIndex = startDate.getMonth();
    const middleDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 3);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      const day = date.getDate();
      const dayName = daysOfWeek[date.getDay()].slice(0, 3); // Obtener solo las primeras 3 letras
      const isCurrentDay = date.toDateString() === currentDate.toDateString();
      const isMiddleDay = date.toDateString() === middleDate.toDateString();
      const dayClassNames = `py-2 px-4 mx-2 flex flex-col items-center gap-3 rounded-lg  w-[63px] h-[76px]  ${isCurrentDay && 'border border-[#1e1e1e]'}
            ${isCurrentDay && isMiddleDay
          ? 'bg-[#1e1e1e] text-white'
          : isMiddleDay
            ? 'bg-[#1e1e1e] text-white'
            : ''
        }`;
      calendar.push(
        <div key={i} className={dayClassNames} onClick={() => handleDayClick(date)}>
          <div>{day}</div>
          <div>{dayName}</div>
        </div>
      );
    }

    return calendar;
  };


  return (
    <div className='w-full mx-auto flex flex-col items-center gap-y-8'>
      <h2 className="text-xl font-bold">{selectedMonth} 2023</h2>
      <div className="flex items-center justify-center ">
        <button className="text-xl" onClick={handlePrevWeek}>
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <div className="flex">
          {renderCalendar()}
        </div>
        <button className="text-xl" onClick={handleNextWeek}>
          <ion-icon name="arrow-forward"></ion-icon>
        </button>
      </div>
    </div>
  );
};




