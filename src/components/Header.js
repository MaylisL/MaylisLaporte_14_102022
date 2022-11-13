//libraries
import React from 'react'

//styles
import hrnet from '../images/HRnet-logo.png'
import './header.css';

export default function Header({title}) {

  return (
    <div className='header-wrapper'>
        <div className='image-wrapper'>
            <img src={hrnet} alt="logo hrnet" width="230px" height="122px"/>
        </div>
        <h1 className='title'>{title}</h1>
    </div>
  )
}