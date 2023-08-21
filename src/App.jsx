import React from 'react';
import { Route, Routes, BrowserRouter as Router
} from 'react-router-dom'
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import NavBar from './components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
    <NavBar/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/comunidade' element={<Contacts/>}/>
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
    <ToastContainer/>
    </div>
  );
}
export default App;
