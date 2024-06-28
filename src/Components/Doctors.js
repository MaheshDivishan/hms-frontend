import React, { useEffect, useState } from 'react';
import UiDoctor from './UiDoctor';
import Navbar from './Navbar';
import './style.css';
import Axios from 'axios';



export default function Doctors() {
  const [name, setName] = useState("");
  const [speciality, setspeciality] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);


  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () => {
    // GET functionality
    Axios.get("http://localhost:3001/api/doctor/getall").then(response => {
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
        name: name,
        speciality: speciality
      
      };
      Axios.post("http://localhost:3001/api/doctor/create", payload).then(()=> {
        getUsers();
      }).catch(err => {
        console.log(err);
      })
  
      setName("");
      setspeciality("");
    }
    else{
      updateUsers();

    }
    
  };

  const updateUsers = () => {
    // Update functionality
    const payload = {
      id: submittedData[selectedAppointmentIndex].id,
      name: name,
      speciality: speciality
    };
    Axios.put("http://localhost:3001/api/doctor/update", payload).then(()=> {
      getUsers();
    }).catch(err => {
      console.log(err);
    })

    setName("");
    setspeciality("");

    setIsEdit(false);

  };

  const handleUpdate = (index) => {

    setSelectedAppointmentIndex(index); // Set the index for the update form
    setIsEdit(true);
  
    setName(submittedData[index].name);
    setspeciality(submittedData[index].speciality);
  };



  const handleDelete = (index) => {
    
    const id = submittedData[index].id;
  
    Axios.delete(`http://localhost:3001/api/doctor/delete/${id}`)
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
          <label className='label' htmlFor="name">Name</label>
          <input
            className='input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className='label' htmlFor="city">Speciality</label>
          <input
            className='input'
            type="text"
            value={speciality}
            onChange={(e) => setspeciality(e.target.value)}
          />
          <br />
          <button className='button2' onClick={addUsers}>Submit</button>
        </div>
        <div className='appointments-container'>
          <div className='appoinment'>
            {submittedData.map((data, index) => (
              <UiDoctor key={index} index={index} name={data.name} speciality={data.speciality}  onUpdate={handleUpdate}
              onDelete={handleDelete} />
            ))}
             
          </div>
        </div>
      </div>
    </div>
  );

}
