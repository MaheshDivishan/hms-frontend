import React from 'react'
import './style.css';

export default function UiDoctor({ index,name,speciality,onUpdate, onDelete}) {
  return (
    <div className='appointments'>
    <h3>Doctor {index + 1}</h3>
    <p>Name: {name}</p>
    <p>Speciality: {speciality}</p>
    <button className='button' onClick={() => onUpdate(index)}>Update</button>
    <button className='button1' onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}
