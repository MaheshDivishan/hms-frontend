import React, { useEffect, useState } from 'react';
import Ui from './Ui';
import Navbar from './Navbar';
import './style.css';
import Axios from 'axios';


export default function Form() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null); // Stores the index of the appointment being updated


  useEffect(() =>{
    getUsers();
  },[]);

  const getUsers = () => {
    // Update functionality
    Axios.get("http://localhost:3001/api/getall").then(response => {
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
        city:city,
        age:age
      };
      Axios.post("http://localhost:3001/api/create", payload).then(()=> {
        getUsers();
      }).catch(err => {
        console.log(err);
      })
  
      setName("");
      setCity("");
      setAge("");
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
      city:city,
      age:age
    };
    Axios.put("http://localhost:3001/api/update", payload).then(()=> {
      getUsers();
    }).catch(err => {
      console.log(err);
    })
      setName("");
      setCity("");
      setAge("");

    setIsEdit(false);

  };

  const handleUpdate = (index) => {

    setSelectedAppointmentIndex(index); // Set the index for the update form
    setIsEdit(true);
    setName(submittedData[index].name);
    setCity(submittedData[index].city);
    setAge(submittedData[index].age);
  };


  const handleDelete = (index) => {
    
    const id = submittedData[index].id;
  
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
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
          <label className='label' htmlFor="city">City</label>
          <input
            className='input'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <label className='label' htmlFor="age">Age</label>
          <input
            className='input'
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <button className='button2' onClick={addUsers}>Submit</button>
        </div>
        <div className='appointments-container'>
          <div className='appoinment'>
            {submittedData.map((data, index) => (
              <Ui key={index} index={index} name={data.name} City={data.city} Age={data.age} onUpdate={handleUpdate}
              onDelete={handleDelete} />
            ))}
             
          </div>
        </div>
      </div>
    </div>
  );
}
