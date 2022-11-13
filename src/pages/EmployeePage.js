//libraries
import { Link } from "react-router-dom";
import React from 'react';

//components
import Header from '../components/Header';
import TableComponent from '../components/Table';

export default function EmployeePage() {
  return (
    <div>
        <Header title={'Current Employee'} />
        <TableComponent/>
        <nav>
            <Link to="/">Home</Link>
        </nav>
    </div>
  )
}
