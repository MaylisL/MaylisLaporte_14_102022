//libraries
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/employeeSlice';

//components
import DatePickerComponent from './DatePicker';
import MyDropdown from './dropdown';
import { ModalComponent } from './ModalComponent';

import { departments, states } from '../data/data';

//styles
import './form.css';

export default function Form() {

    // change structure of state options object to make it work with dropdown
    const statesToUse = states.map(state => {
       return {
        value: state.abbreviation,
        label: state.name
       };
    });

    const [showModale, setShowModale] = useState(false);
    const [resetFormKey, setResetFormKey] = useState(true);
   
    const dispatch = useDispatch();

    const initialEmployeeInfo = {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: statesToUse[0].value,
        zipCode: "",
        department: departments[0].value,
    }
    const [employeeInfo, setEmployeeInfo] = useState(initialEmployeeInfo);

    const handleChange = (event) => {
        setEmployeeInfo({ ...employeeInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(add({...employeeInfo, id: new Date().getTime()}));
        setShowModale(true);
        setEmployeeInfo(initialEmployeeInfo);
        setResetFormKey(!resetFormKey);
    };

    const handleStateOptionChange = (newSelection) => {
        setEmployeeInfo({ ...employeeInfo, state: newSelection });
    }
    const handleDepartmentOptionChange = (newSelection) => {
        setEmployeeInfo({ ...employeeInfo, department: newSelection });
    }
    const handleDateChange = (selectedDate, name) => {
        setEmployeeInfo({...employeeInfo, [name]: selectedDate});
    }

    return (
        <div className='form-container'>
            <form id="create-employee" onSubmit={handleSubmit} key={resetFormKey}>
                <div className='formId'>
                    <label className='formLabels' htmlFor="first-name">First Name</label>
                    <input className='formInputs' type="text" id="first-name" name="firstName" value={employeeInfo.firstName} onChange={(e) => handleChange(e)}/>

                    <label className='formLabels' htmlFor="last-name">Last Name</label>
                    <input className='formInputs' type="text" id="last-name" name="lastName" value={employeeInfo.lastName} onChange={(e) => handleChange(e)} />

                    <label className='formLabels' htmlFor="date-of-birth">Date of Birth</label>
                    <DatePickerComponent id="date-of-birth" name="dateOfBirth" onChange={(selectedDate) => handleDateChange(selectedDate, 'dateOfBirth')} value={employeeInfo.dateOfBirth} />
                    
                    <label className='formLabels' htmlFor="start-date">Start Date</label>
                    <DatePickerComponent id="start-date" name="startDate" onChange={(selectedDate) => handleDateChange(selectedDate, 'startDate')} value={employeeInfo.startDate}/>
                </div>
                <fieldset className="address">
                    <legend>Address</legend>

                    <label className='formLabels' htmlFor="street">Street</label>
                    <input className='formInputs' id="street" name="street" type="text" value={employeeInfo.street} onChange={(e) => handleChange(e)}/>

                    <label className='formLabels' htmlFor="city">City</label>
                    <input className='formInputs' id="city" name="city" type="text" value={employeeInfo.city} onChange={(e) => handleChange(e)} />

                    <label className='formLabels' htmlFor="state">State</label>
                    <MyDropdown options={statesToUse} onChange={handleStateOptionChange} value={employeeInfo.state} id="state" name="state" />

                    <label className='formLabels' htmlFor="zip-code">Zip Code</label>
                    <input className='formInputs' id="zip-code" name="zipCode" type="number" value={employeeInfo.zipCode} onChange={(e) => handleChange(e)}/>
                </fieldset>
                <div className='formWorkDepartment'>
                    <label className='formLabels' htmlFor="department">Department</label>
                    <MyDropdown options={departments} onChange={handleDepartmentOptionChange} id="department" name="department" />
                </div>    
                <button className="button button-submit" type='submit'>Save</button>
            </form>
            <ModalComponent isVisible={showModale} message={'Employee Created!'} handleClose={() => setShowModale(false)} />
        </div>
    )
}