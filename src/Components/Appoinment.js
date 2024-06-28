import React, { useEffect, useState } from 'react';
import Ui from './Ui';
import Navbar from './Navbar';
import './style.css';
import Axios from 'axios';
import UiAppoinment from './UiAppoinment';


export default function Appoinment() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null); // Stores the index of the appointment being updated


  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () => {
    // GET functionality
    Axios.get("http://localhost:3001/api/appoinment/getall").then(response => {
      console.log(response.data);
      setSubmittedData(response.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const addUsers = () => {
    // Add functionality
    if(isEdit === false){
      const payload = {
        id: submittedData.length,
        patientName: patientName,
        doctorName:doctorName,
        date:date
      };
      Axios.post("http://localhost:3001/api/appoinment/create", payload).then(()=> {
        getUsers();
      }).catch(err => {
        console.log(err);
      })
  
      setPatientName("");
      setDoctorName("");
      setDate("");
    }
    else{
      updateUsers();

    }
    
  };

  const updateUsers = () => {
    // Update functionality
    const payload = {
      id: submittedData[selectedAppointmentIndex].id,
      patientName: patientName,
      doctorName:doctorName,
      date:date
    };
    Axios.put("http://localhost:3001/api/appoinment/update", payload).then(()=> {
      getUsers();
    }).catch(err => {
      console.log(err);
    })

    setPatientName("");
    setDoctorName("");
    setDate("");

    setIsEdit(false);

  };

  const handleUpdate = (index) => {

    setSelectedAppointmentIndex(index); // Set the index for the update form
  
    setIsEdit(true);
   
    setPatientName(submittedData[index].patientName);
    setDoctorName(submittedData[index].doctorName);
    setDate(submittedData[index].date);
  };


  const handleDelete = (index) => {
    
    const id = submittedData[index].id;
  
    Axios.delete(`http://localhost:3001/api/appoinment/delete/${id}`)
      .then(() => {
        getUsers();
      })
      .catch(err => {
        console.error(err);
        // Handle error with user feedback
      });
  };
  

  return (    
    <div>
      <Navbar/>
      <div className='container'>
        <div className='form-container'>
          <label className='label' htmlFor="name">Patient Name</label>
          <input
            className='input'
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <br />
          <label className='label' htmlFor="city">Doctor Name</label>
          <input
            className='input'
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <br />
          <label className='label' htmlFor="age">Age</label>
          <input
            className='input'
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <button className='button2' onClick={addUsers}>Submit</button>
        </div>
        <div className='appointments-container'>
          <div className='appoinment'>
            {submittedData.map((data, index) => (
              <UiAppoinment key={index} index={index} patientName={data.patientName} doctorName={data.doctorName} date={data.date} onUpdate={handleUpdate}
              onDelete={handleDelete} />
            ))}
             
          </div>
        </div>
      </div>
    </div>
  );
}