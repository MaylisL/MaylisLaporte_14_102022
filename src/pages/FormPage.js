// libraries
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

// components
import Form from '../components/Form';
import Header from '../components/Header';

export default function FormPage() {
        
  return (
    <Fragment>
        <Header title={'Create Employee'}/>
        <Form/>
        <nav>
            <Link to="current-employee">View Current Employees </Link>
        </nav>
    </Fragment>
)}  