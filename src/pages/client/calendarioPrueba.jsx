import React, { useState, useEffect } from 'react';

export default function SteoFechaYHora() {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const currentDate = new Date();

  const getCurrentWeekStart = () => {
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
    return currentWeekStart;
  };

  const [currentWeekStartDay, setCurrentWeekStartDay] = useState(getCurrentWeekStart());
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(monthsOfYear[currentDate.getMonth()]);

  const getNext30DaysLimit = () => {
    const next30Days = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 30);
    return next30Days;
  };

  const [next30DaysLimit, setNext30DaysLimit] = useState(getNext30DaysLimit());

  useEffect(() => {
    setCurrentWeekStartDay(getCurrentWeekStart());
    setSelectedDay(currentDate);
    setSelectedMonth(monthsOfYear[currentDate.getMonth()]);
    setNext30DaysLimit(getNext30DaysLimit());
  }, []);

  const handleDayClick = (day) => {
    if (day >= currentDate && day <= next30DaysLimit) {
      setSelectedDay(day);
      setSelectedMonth(monthsOfYear[day.getMonth()]);
    }
  };

  const handlePrevWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() - 7);
      return newWeekStart;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStartDay((prevWeekStartDay) => {
      const newWeekStart = new Date(prevWeekStartDay.getFullYear(), prevWeekStartDay.getMonth(), prevWeekStartDay.getDate() + 7);
      return newWeekStart;
    });
  };

  const renderCalendar = () => {
    const calendar = [];
    const startDate = new Date(currentWeekStartDay);
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      const day = date.getDate();
      const dayName = daysOfWeek[date.getDay()].slice(0, 3);
      const isCurrentDay = date.toDateString() === currentDate.toDateString();
      const isSelectedDay = date.toDateString() === selectedDay.toDateString();
      const isSelectable = date >= currentDate && date <= next30DaysLimit;
  
      const dayClassNames = `py-2 px-4 mx-2 flex flex-col items-center gap-3 rounded-lg w-[63px] h-[76px] ${isCurrentDay ? 'border border-[#1e1e1e]' : ''
        } ${isCurrentDay && isSelectedDay ? 'bg-[#1e1e1e] text-white' : isSelectedDay ? 'bg-[#1e1e1e] text-white' : ''} ${!isSelectable ? 'opacity-50 cursor-not-allowed' : ''
        }`;
  
      calendar.push(
        <div
          key={i}
          className={dayClassNames}
          onClick={() => handleDayClick(date)}
          disabled={!isSelectable}
        >
          <div>{day}</div>
          <div>{dayName}</div>
        </div>
      );
    }
  
    return calendar;
  };
  
  return (
    <div className="w-full mx-auto flex flex-col items-center gap-y-8">
      <h2 className="text-xl font-bold">{selectedMonth} 2023</h2>
      <div className="flex items-center justify-center">
        <button
          className="text-xl"
          onClick={handlePrevWeek}
          disabled={currentWeekStartDay <= currentDate}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <div className="flex">{renderCalendar()}</div>
        <button
          className="text-xl"
          onClick={handleNextWeek}
          disabled={next30DaysLimit <= currentWeekStartDay}
        >
          <ion-icon name="arrow-forward"></ion-icon>
        </button>
      </div>
    </div>
  );
  };


