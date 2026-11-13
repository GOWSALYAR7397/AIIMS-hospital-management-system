import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function NavbarComp() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          🏥 AIIMS Hospital
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <NavDropdown title="Login" id="login-dropdown">

              <NavDropdown.Item as={NavLink} to="/adminlogin">
                Admin Login
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/doctorlogin">
                Doctor Login
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/userlogin">
                User Login
              </NavDropdown.Item>

            </NavDropdown>

            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={NavLink} to="/patients">
              Patients
            </Nav.Link>

            <Nav.Link as={NavLink} to="/doctors">
              Doctors
            </Nav.Link>

            <Nav.Link as={NavLink} to="/bloodbank">
              Blood Bank
            </Nav.Link>

            <Nav.Link as={NavLink} to="/rooms">
              Rooms
            </Nav.Link>

            <Nav.Link as={NavLink} to="/ambulance">
              Ambulance
            </Nav.Link>

            <Nav.Link as={NavLink} to="/canteen">
              Canteen
            </Nav.Link>

            <Nav.Link as={NavLink} to="/speciality">
              Facilities
            </Nav.Link>

            <Nav.Link as={NavLink} to="/appointment">
              Appointment
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;