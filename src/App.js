import './App.css';
import Form from './Components/Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Doctors from './Components/Doctors';
import Appoinment from './Components/Appoinment';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Appoinment/>} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/patients" element={<Form/>} />
    </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
