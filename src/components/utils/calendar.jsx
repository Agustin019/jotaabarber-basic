
import format from 'date-fns/format';

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function Calendar ({ selectedDay, setSelectedDay, handleDateChange, isOpen, setIsOpen }) {
   
    const handleClick = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
    return (
      <div className='relative'>
        <button className="example-custom-input" onClick={handleClick}>
          {format(selectedDay, "dd-MM-yyyy")}
        </button>
        <div className=' absolute'>

        {isOpen && (
          <DatePicker selected={selectedDay} onChange={handleDateChange} inline />
        )}
        </div>
      </div>
    );
  };
