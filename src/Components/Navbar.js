import React from 'react';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div style={navbarStyle}>        
      <ul style={ulStyle}>
      <li style={brandStyle}>Hospital Mangement System</li> {/* Navigation bar topic */}
          <li style={liStyle}>
             <Link style={navLinkStyle} to="/">Appointments</Link>
          </li>
          <li style={liStyle}>
             <Link style={navLinkStyle} to="/doctors">Doctors</Link>
          </li>
          <li style={liStyle}>
             <Link style={navLinkStyle} to="/patients">Patients</Link>
          </li>
          {/* Add more navigation items as needed */}
      </ul>
    </div>
  )
}
const navbarStyle = {
    background: '#333',
    color: '#fff',
    padding: '1px',
    top:0,
    
  }
  
  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0
  }
  
  const liStyle = {
    margin: '0 80px' // Add some margin between list items for spacing
    
  }
  const brandStyle = {
    marginRight: 'auto', // Push brand to the left
    fontWeight: 'bold', // Make the brand text bold
    marginLeft: '50px'
    
  };

  const navLinkStyle = { // New CSS class for links
    textDecoration: 'none', // Remove default underline on links
    color: '#fff', // Inherit color from navbar
    padding: '10px', // Add some padding for better visual separation
  };
  