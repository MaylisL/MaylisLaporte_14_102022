import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import store from '../../redux/store';

import FormPage from "../FormPage";

describe('form page', () => {
   
    test('should show header', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <FormPage />
                </BrowserRouter>
            </Provider>)
        expect(screen.getByRole('heading', { name: 'Create Employee'})).toBeInTheDocument()
    });
    test('should show all the input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <FormPage />
                </BrowserRouter>
            </Provider>)

        expect(screen.getByLabelText('First Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
        expect(screen.getByText('Date of Birth')).toBeInTheDocument()
        expect(screen.getByText('Start Date')).toBeInTheDocument()
        expect(screen.getByLabelText('Street')).toBeInTheDocument()
        expect(screen.getByLabelText('City')).toBeInTheDocument()
        expect(screen.getByText('State')).toBeInTheDocument()
        expect(screen.getByText('Department')).toBeInTheDocument()
        expect(screen.getByText('Save')).toBeInTheDocument()
        
    });

    test('should show a link to employee page', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <FormPage />
                </BrowserRouter>
            </Provider>)
            
        expect(screen.getByRole('link', { name: 'View Current Employees'})).toBeInTheDocument()
        
    });
})