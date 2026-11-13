
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  FaUserInjured,
  FaUserMd,
  FaDollarSign,
  FaAmbulance,
} from "react-icons/fa";

function Overview() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [patientRes, doctorRes, ambulanceRes] = await Promise.all([
          fetch("http://localhost:5000/api/patients"),
          fetch("http://localhost:5000/api/doctors"),
          fetch("http://localhost:5000/api/ambulances"),
        ]);

        if (!patientRes.ok || !doctorRes.ok || !ambulanceRes.ok) {
          throw new Error("Unable to load dashboard data");
        }

        const patientData = await patientRes.json();
        const doctorData = await doctorRes.json();
        const ambulanceData = await ambulanceRes.json();

        setPatients(patientData);
        setDoctors(doctorData);
        setAmbulances(ambulanceData);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Dashboard data could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Patient Gender Count
  const maleCount = patients.filter(
    (p) => p.gender?.toLowerCase() === "male"
  ).length;

  const femaleCount = patients.filter(
    (p) => p.gender?.toLowerCase() === "female"
  ).length;

  const otherCount = patients.length - maleCount - femaleCount;

  const genderData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount },
    ...(otherCount > 0 ? [{ name: "Other", value: otherCount }] : []),
  ];

  const COLORS = ["#e80d9bff", "#147e6aff", "#05224691"];

  // Patient Ratio
  const pieData = genderData.filter((item) => item.value > 0);

  // Records Overview
  const barData = [
    { name: "Patients", count: patients.length },
    { name: "Doctors", count: doctors.length },
    { name: "Ambulances", count: ambulances.length },
  ];

  // Doctors by Specialization
  const specializationCounts = doctors.reduce((acc, doctor) => {
    const specialization = doctor.specialization || "Not Specified";
    acc[specialization] = (acc[specialization] || 0) + 1;
    return acc;
  }, {});

  const availableAmbulances = ambulances.filter(
    (a) => a.status?.toLowerCase() === "available"
  ).length;

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading Dashboard Data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Dashboard Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <FaUserInjured size={30} className="text-primary" />
            <h4>{patients.length}</h4>
            <p>Total Patients</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <FaUserMd size={30} className="text-success" />
            <h4>{doctors.length}</h4>
            <p>Available Staff</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <FaDollarSign size={30} className="text-warning" />
            <h4>Not Available</h4>
            <p>Avg. Treatment Cost</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <FaAmbulance size={30} className="text-danger" />
            <h4>{availableAmbulances}</h4>
            <p>Available Cars</p>
          </Card>
        </Col>
      </Row>

      {/* Records Chart and Patient Ratio */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="p-3 shadow-sm">
            <h6>Hospital Records Overview</h6>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#7E57C2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Patients Ratio by Gender</h6>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Gender, Records and Specialization */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Patients by Gender</h6>

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
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Hospital Records</h6>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#FF7043"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Doctors by Specialization</h6>

            <ListGroup>
              {Object.entries(specializationCounts).length > 0 ? (
                Object.entries(specializationCounts).map(
                  ([specialization, count]) => (
                    <ListGroup.Item key={specialization}>
                      {specialization} - {count}
                    </ListGroup.Item>
                  )
                )
              ) : (
                <ListGroup.Item>No Doctor Records</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Total Patients */}
      <Row>
        <Col md={12}>
          <Card className="p-3 shadow-sm text-center bg-primary text-white">
            <h4>{patients.length} Registered Patients</h4>
            <p>Live data from MongoDB</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Overview;
