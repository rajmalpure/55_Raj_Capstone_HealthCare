
import React from 'react';
import Home from './components/Home';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import About from './components/About';
import Signup from './components/Signup';
import Patientlist from './components/Patientlist';
import Login from './components/login';
import UpdateForm from './components/Updateform';
import Medication from './components/Medication';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<Patientlist/>} />
          <Route path="/patients/:id" element={<UpdateForm/>}/>
          <Route path="/medication" element={<Medication/>}/>
        </Routes>
      
    </Router>
  );
}

export default App;
