import  { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavBar from './Components/NavBar';
import Lead from './Components/Leads/Lead';
import Learner from './Components/Learners/Learner';
import Courses from './Components/Courses/Courses';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the current location is the login page
    setIsUserLoggedIn(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <>
      {isUserLoggedIn && <NavBar />}
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/leads'element={<Lead/>}></Route>
        <Route path='/learners'element={<Learner/>}></Route>
        <Route path='/courses'element={<Courses/>}></Route>
        

      </Routes>
    </>
  );
}

export default App;

// import React, { useEffect } from 'react';
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import './App.css';
// import Login from './Components/Login/Login';
// import Home from './Components/Home/Home';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import NavBar from './Components/NavBar';
// import { useSelector } from 'react-redux';

// function App() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     if (!token && location.pathname !== '/') {
//       navigate('/');
//     }
//   }, [token, location.pathname, navigate]);

//   return (
//     <>
//       {token && <NavBar />}
//       <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/home' element={<Home />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

