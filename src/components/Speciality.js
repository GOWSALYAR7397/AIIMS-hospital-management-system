import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Badge
} from "react-bootstrap";

function Speciality() {

  const [specialities, setSpecialities] = useState([
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Oncology",
    "ENT",
    "Dermatology",
    "Gastroenterology",
    "Nephrology",
    "Pulmonology"
  ]);

  const [query, setQuery] = useState("");
  const [newSpec, setNewSpec] = useState("");

  const filtered = specialities.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();

    const trimmed = newSpec.trim();

    if (!trimmed) {
      return alert("Enter a facility name.");
    }

    if (specialities.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      return alert("This facility already exists.");
    }

    setSpecialities((prev) => [trimmed, ...prev]);
    setNewSpec("");
  };

  const handleDelete = (name) => {
    if (!window.confirm(`Delete facility "${name}"?`)) return;

    setSpecialities((prev) => prev.filter((s) => s !== name));
  };

  return (
    <Card className="p-4 shadow">

      <h3 className="text-center mb-4">
        🏥 Hospital Facilities
      </h3>

      <Row className="mb-4">

        <Col md={6}>
          <Form onSubmit={handleAdd} className="d-flex gap-2">

            <Form.Control
              placeholder="Add new facility (e.g. Rheumatology)"
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
            />

            <Button type="submit" variant="primary">
              Add
            </Button>

          </Form>
        </Col>

        <Col md={6}>
          <InputGroup>

            <Form.Control
              placeholder="Search facilities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Button
              variant="outline-secondary"
              onClick={() => setQuery("")}
            >
              Clear
            </Button>

          </InputGroup>
        </Col>

      </Row>

      <ListGroup>

        {filtered.length === 0 ? (

          <ListGroup.Item className="text-center text-muted">
            No facilities found.
          </ListGroup.Item>

        ) : (

          filtered.map((s, idx) => (

            <ListGroup.Item
              key={s + idx}
              className="d-flex justify-content-between align-items-center"
            >

              <div>
                <strong>{s}</strong>

                <Badge bg="info" className="ms-2">
                  {specialities.indexOf(s) + 1}
                </Badge>

                <div className="text-muted small">
                  Facility / Department
                </div>
              </div>

              <div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(s)}
                >
                  Delete
                </Button>
              </div>

            </ListGroup.Item>

          ))

        )}

      </ListGroup>

    </Card>
  );
}

export default Speciality;