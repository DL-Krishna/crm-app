
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Lead from "./Components/Leads/Lead";
import Navbar from "./Components/Navbar/Navbar";
import Learner from "./Components/Learners/Learner";
import Courses from "./Components/Courses/Courses";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the current location is the login page
    setIsUserLoggedIn(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <>
      {isUserLoggedIn && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leads" element={<Lead />} />
        <Route path="/learners" element={<Learner />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </>
  );
}

export default App;
