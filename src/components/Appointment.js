
import React, { useEffect, useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";

function Appointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");
  const [loading, setLoading] = useState(false);

  // Load Patients and Doctors from MongoDB
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patientResponse = await fetch(
        "http://localhost:5000/api/patients"
      );

      const doctorResponse = await fetch(
        "http://localhost:5000/api/doctors"
      );

      if (!patientResponse.ok || !doctorResponse.ok) {
        throw new Error("Unable to load patient or doctor details");
      }

      const patientData = await patientResponse.json();
      const doctorData = await doctorResponse.json();

      setPatients(patientData);
      setDoctors(doctorData);
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage(error.message);
      setMessageType("danger");
    }
  };

  // Save Appointment to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient: patient,
            doctor: doctor,
            date: date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Appointment booking failed");
      }

      setMessage("Appointment booked successfully!");
      setMessageType("success");

      setPatient("");
      setDoctor("");
      setDate("");

    } catch (error) {
      console.error("Booking Error:", error);
      setMessage(error.message);
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-4 mb-4">

      <Card
        style={{ width: "25rem", maxWidth: "100%" }}
        className="shadow p-4"
      >

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_zXsYH0TcriW41qZCEkx-wjgjtccO0wCtw&s"
          alt="profile"
          className="rounded-circle mx-auto mb-3"
          width="200"
          height="200"
        />

        <h3 className="text-center mb-4">
          📅 Book Appointment
        </h3>

        {message && (
          <Alert variant={messageType}>
            {message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          {/* Patient Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>

            <Form.Select
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              required
            >
              <option value="">Select Patient</option>

              {patients.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Doctor Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Doctor</Form.Label>

            <Form.Select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>

              {doctors.map((item) => (
                <option key={item._id} value={item._id}>
                  Dr. {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Appointment Date */}
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>

            <Form.Control
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          {/* Book Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={
              loading ||
              patients.length === 0 ||
              doctors.length === 0
            }
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </Button>

          {patients.length === 0 && (
            <p className="text-danger mt-3">
              No patients available. Please register a patient first.
            </p>
          )}

          {doctors.length === 0 && (
            <p className="text-danger mt-2">
              No doctors available. Please add a doctor first.
            </p>
          )}

        </Form>
      </Card>
    </div>
  );
}

export default Appointment;
