import React from 'react'
import './style.css';

export default function UiAppoinment({ index,patientName,doctorName,date,onUpdate, onDelete}) {
  return (
    <div className='appointments'>
    <h3>Doctor {index + 1}</h3>
    <p>Patient Name: {patientName}</p>
    <p>Doctor Name: {doctorName}</p>
    <p>Date: {date}</p>
    <button className='button' onClick={() => onUpdate(index)}>Update</button>
    <button className='button1' onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}
