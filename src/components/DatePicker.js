//libraries
import React, { useState } from "react";
import DatePicker from "react-datepicker";
//components

//styles
import "react-datepicker/dist/react-datepicker.css";
import './datePicker.css'

const DatePickerComponent = (props) => {
    const [pickedDate, setPickedDate] = useState();

    const handleDateChange = (selectedDate) => {
            const day = selectedDate.getDate();
            const month = selectedDate.getMonth()+1;
            const year = selectedDate.getFullYear();
            const formatedDate = `${month}/${day}/${year}`

            props.onChange(formatedDate)
            setPickedDate(selectedDate)
    } 

    return (
        <DatePicker 
            selected={pickedDate} 
            onChange={(selectedDate) => handleDateChange(selectedDate)}  
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"

        />
    );
};

export default DatePickerComponent;