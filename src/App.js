import logo from './logo.svg';
import './App.css';
import Hotel from './components/Hotel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/hospital/NavBar';
import Home from './components/hospital/Home';
import DoctorManagement from './components/hospital/DoctorManagement';
import PatientManagement from './components/hospital/Patientmanagement';

function App() {
  return (
    <div className="App">
      {/* <Hotel/> */}
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<NavBar/>}>
                <Route index element={<Home/>}/>
                <Route path='/doctors' element={<DoctorManagement/>}/>
                <Route path='/patients' element={<PatientManagement/>}/>
             </Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
