import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import {
  FaUserInjured,
  FaUserMd,
  FaDollarSign,
  FaAmbulance,
} from "react-icons/fa";

import { BsPeopleFill } from "react-icons/bs";
import { GiStethoscope } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";

function Dashboard() {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [treatmentCost, setTreatmentCost] = useState(null);

  const [loading, setLoading] = useState(true);

  const COLORS = ["#7E57C2", "#26A69A", "#FF7043", "#147e6a", "#e80d9b"];

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        // PATIENTS
        const patientsResponse = await fetch(
          "http://localhost:5000/api/patients"
        );

        if (!patientsResponse.ok) {
          throw new Error("Patients API Error");
        }

        const patientsData = await patientsResponse.json();

        setPatients(Array.isArray(patientsData) ? patientsData : []);

        // DOCTORS
        const doctorsResponse = await fetch(
          "http://localhost:5000/api/doctors"
        );

        if (!doctorsResponse.ok) {
          throw new Error("Doctors API Error");
        }

        const doctorsData = await doctorsResponse.json();

        setDoctors(Array.isArray(doctorsData) ? doctorsData : []);

        // AMBULANCES
        const ambulanceResponse = await fetch(
          "http://localhost:5000/api/ambulances"
        );

        if (!ambulanceResponse.ok) {
          throw new Error("Ambulance API Error");
        }

        const ambulanceData = await ambulanceResponse.json();

        setAmbulances(
          Array.isArray(ambulanceData) ? ambulanceData : []
        );

        // BOOKINGS
        const bookingsResponse = await fetch(
          "http://localhost:5000/api/bookings"
        );

        if (!bookingsResponse.ok) {
          throw new Error("Bookings API Error");
        }

        const bookingsData = await bookingsResponse.json();

        const costs = Array.isArray(bookingsData)
          ? bookingsData
              .map((booking) =>
                Number(
                  booking.treatmentCost ??
                  booking.cost ??
                  booking.amount
                )
              )
              .filter(
                (cost) => Number.isFinite(cost) && cost > 0
              )
          : [];

        if (costs.length > 0) {

          const average =
            costs.reduce((total, cost) => total + cost, 0) /
            costs.length;

          setTreatmentCost(average.toFixed(2));

        } else {

          setTreatmentCost(null);

        }

      } catch (error) {

        console.log("Dashboard Data Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardData();

  }, []);

  // AVAILABLE AMBULANCES
  const availableCars = ambulances.filter(
    (ambulance) =>
      ambulance.status?.toLowerCase() === "available"
  ).length;

  // PATIENTS BY GENDER
  const genderCounts = {};

  patients.forEach((patient) => {

    const gender = patient.gender || "Not Specified";

    genderCounts[gender] = (genderCounts[gender] || 0) + 1;

  });

  const genderData = Object.keys(genderCounts).map((gender) => ({
    name: gender,
    value: genderCounts[gender],
  }));

  // PATIENTS BY DISEASE
  const diseaseCounts = {};

  patients.forEach((patient) => {

    const disease = patient.disease || "Not Specified";

    diseaseCounts[disease] = (diseaseCounts[disease] || 0) + 1;

  });

  const diseaseData = Object.keys(diseaseCounts).map((disease) => ({
    disease,
    patients: diseaseCounts[disease],
  }));

  // DOCTORS BY SPECIALIZATION
  const specializationCounts = {};

  doctors.forEach((doctor) => {

    const specialization =
      doctor.specialization || "Not Specified";

    specializationCounts[specialization] =
      (specializationCounts[specialization] || 0) + 1;

  });

  const specializationData = Object.keys(
    specializationCounts
  ).map((specialization) => ({
    specialization,
    doctors: specializationCounts[specialization],
  }));

  return (

    <Container fluid>

      <Row>

        {/* SIDEBAR */}

        <Col md={2} className="bg-light vh-100 p-3 shadow-sm">

          <Button
            variant="primary"
            className="w-100 mb-3"
            as={Link}
            to="/patients"
          >
            + Register Patient
          </Button>

          <ListGroup variant="flush">

            <ListGroup.Item as={Link} to="/patients">
              <BsPeopleFill /> Patients
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/overview">
              <MdDashboard /> Overview
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/speciality">
              <GiStethoscope /> Departments
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/doctors">
              <FaUserMd /> Doctors
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/bloodbank">
              Blood Bank
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/ambulance">
              Ambulance
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/canteen">
              Canteen
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/">
              Home
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/rooms">
              Rooms
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/speciality">
              Facilities
            </ListGroup.Item>

            <ListGroup.Item as={Link} to="/appointment">
              Appointments
            </ListGroup.Item>

          </ListGroup>

        </Col>

        {/* DASHBOARD CONTENT */}

        <Col md={10} className="p-4">

          <h3 className="mb-4">Hospital Dashboard</h3>

          {loading && (
            <p className="text-primary">Loading Dashboard Data...</p>
          )}

          {/* DASHBOARD CARDS */}

          <Row className="mb-4">

            <Col md={3} className="mb-3">

              <Card className="text-center p-3 shadow-sm">

                <FaUserInjured
                  size={30}
                  className="text-primary mx-auto"
                />

                <h4>{patients.length}</h4>

                <p>Total Patients</p>

              </Card>

            </Col>

            <Col md={3} className="mb-3">

              <Card className="text-center p-3 shadow-sm">

                <FaUserMd
                  size={30}
                  className="text-success mx-auto"
                />

                <h4>{doctors.length}</h4>

                <p>Total Doctors</p>

              </Card>

            </Col>

            <Col md={3} className="mb-3">

              <Card className="text-center p-3 shadow-sm">

                <FaDollarSign
                  size={30}
                  className="text-warning mx-auto"
                />

                <h4>
                  {treatmentCost !== null
                    ? `₹${treatmentCost}`
                    : "N/A"}
                </h4>

                <p>Avg. Treatment Cost</p>

              </Card>

            </Col>

            <Col md={3} className="mb-3">

              <Card className="text-center p-3 shadow-sm">

                <FaAmbulance
                  size={30}
                  className="text-danger mx-auto"
                />

                <h4>{availableCars}</h4>

                <p>Available Ambulances</p>

              </Card>

            </Col>

          </Row>

          {/* GENDER AND DISEASE CHARTS */}

          <Row className="mb-4">

            <Col md={4} className="mb-3">

              <Card className="p-3 shadow-sm">

                <h6>Patients by Gender</h6>

                {genderData.length > 0 ? (

                  <ResponsiveContainer width="100%" height={250}>

                    <PieChart>

                      <Pie
                        data={genderData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                      >

                        {genderData.map((entry, index) => (

                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />

                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                ) : (

                  <p className="text-muted text-center mt-5">
                    No Patient Data
                  </p>

                )}

              </Card>

            </Col>

            <Col md={8} className="mb-3">

              <Card className="p-3 shadow-sm">

                <h6>Patients by Disease</h6>

                {diseaseData.length > 0 ? (

                  <ResponsiveContainer width="100%" height={250}>

                    <BarChart data={diseaseData}>

                      <XAxis dataKey="disease" />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="patients"
                        fill="#7E57C2"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <p className="text-muted text-center mt-5">
                    No Patient Data
                  </p>

                )}

              </Card>

            </Col>

          </Row>

          {/* DOCTORS CHART */}

          <Row className="mb-4">

            <Col md={12}>

              <Card className="p-3 shadow-sm">

                <h6>Doctors by Specialization</h6>

                {specializationData.length > 0 ? (

                  <ResponsiveContainer width="100%" height={250}>

                    <BarChart data={specializationData}>

                      <XAxis dataKey="specialization" />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="doctors"
                        fill="#26A69A"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                ) : (

                  <p className="text-muted text-center mt-5">
                    No Doctor Data
                  </p>

                )}

              </Card>

            </Col>

          </Row>

          {/* TOTAL PATIENTS */}

          <Row>

            <Col md={12}>

              <Card className="p-3 shadow-sm text-center bg-primary text-white">

                <h4>
                  Patients Registered: {patients.length}
                </h4>

                <p>
                  Total records available in Hospital Database
                </p>

              </Card>

            </Col>

          </Row>

        </Col>

      </Row>

    </Container>

  );

}

export default Dashboard;