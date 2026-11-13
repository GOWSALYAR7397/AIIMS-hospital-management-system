import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert
} from "react-bootstrap";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const API = "http://localhost:5000/api/doctors";

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load doctors");
      }

      setDoctors(data);
    } catch (error) {
      setMessage("Server connection failed. Please check backend server.");
      setMessageType("danger");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add Doctor
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !specialization.trim()) {
      setMessage("Please enter doctor name and specialization.");
      setMessageType("warning");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          specialization: specialization.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add doctor.");
      }

      setName("");
      setSpecialization("");
      setMessage("Doctor added successfully!");
      setMessageType("success");

      fetchDoctors();

    } catch (error) {
      setMessage(error.message || "Server connection failed.");
      setMessageType("danger");
    }
  };

  // Delete Doctor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Unable to delete doctor.");
      }

      setMessage("Doctor deleted successfully!");
      setMessageType("success");

      fetchDoctors();

    } catch (error) {
      setMessage(error.message || "Server connection failed.");
      setMessageType("danger");
    }
  };

  return (
    <Container className="my-4">

      <h2 className="text-center mb-4">
        Doctor Management
      </h2>

      {/* Add Doctor Form */}
      <Card className="shadow p-4 mb-4">

        <h4 className="mb-3">
          Add New Doctor
        </h4>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">

            <Form.Label>Doctor Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter doctor name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Specialization</Form.Label>

            <Form.Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              <option value="">Select Specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Oncology">Oncology</option>
              <option value="ENT">ENT</option>
              <option value="Dermatology">Dermatology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Surgery">Surgery</option>
            </Form.Select>

          </Form.Group>

          <Button type="submit" variant="success">
            Add Doctor
          </Button>

        </Form>

        {message && (
          <Alert className="mt-3 mb-0" variant={messageType}>
            {message}
          </Alert>
        )}

      </Card>

      {/* Doctors List */}
      <Card className="shadow p-3">

        <h4 className="mb-3">
          Doctors List
        </h4>

        <Table striped bordered hover responsive>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {doctors.length > 0 ? (

              doctors.map((doctor, index) => (

                <tr key={doctor._id}>

                  <td>{index + 1}</td>

                  <td>{doctor.name}</td>

                  <td>{doctor.specialization || "Not Specified"}</td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </Button>
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4" className="text-center">
                  No doctors available.
                </td>
              </tr>

            )}

          </tbody>

        </Table>

      </Card>

    </Container>
  );
}

export default Doctors;