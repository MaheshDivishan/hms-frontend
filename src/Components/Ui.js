import React from 'react'
import './style.css';

export default function Ui({ index,name,City,Age,onUpdate, onDelete}) {
  return (
    <div className='appointments'>
    <h3>Patient {index + 1}</h3>
    <p>Name: {name}</p>
    <p>City: {City}</p>
    <p>Age: {Age}</p>
    <button className='button' onClick={() => onUpdate(index)}>Update</button>
    <button className='button1' onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}
