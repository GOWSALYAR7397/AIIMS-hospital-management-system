
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import NavbarComp from "./components/NavbarComp";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import DoctorLogin from "./components/DoctorLogin";
import UserLogin from "./components/UserLogin";
import BloodBank from "./components/BloodBank";
import Rooms from "./components/Rooms";
import Ambulance from "./components/Ambulance";
import Canteen from "./components/Canteen";
import Speciality from "./components/Speciality";
import Doctors from "./components/Doctors";
import Appointment from "./components/Appointment";
import FooterComp from "./components/FooterComp";
import Overview from "./components/Overview";
import { Button } from "react-bootstrap";
import BookingForm from "./components/BookingForm";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const appStyle = {
    backgroundColor: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  return (
    <Router>
      <div style={appStyle} className="d-flex flex-column min-vh-100">
        <NavbarComp />

        <div className="text-center my-3">
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </div>

        <div className="flex-grow-1 container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/doctorlogin" element={<DoctorLogin />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/bloodbank" element={<BloodBank />} />
            <Route path="/bookingform" element={<BookingForm />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/canteen" element={<Canteen />} />
            <Route path="/speciality" element={<Speciality />} />
             <Route path="/doctors" element={<Doctors />} />            
             <Route path="/appointment" element={<Appointment />} />
            <Route path="/overview" element={<Overview />} />
          </Routes>
        </div>

        <FooterComp />
      </div>
    </Router>
  );
}

export default App;