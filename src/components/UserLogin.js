import React from "react";
import { Card, Form, Button } from "react-bootstrap";

function UserLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User login (successfully completed.)");
  };

  return (
  
           <Card style={{ width: "25rem" }} className="shadow p-4">
             <img src="https://www.shutterstock.com/image-photo/system-accessed-by-doctors-fingerprint-260nw-2291512001.jpg " alt="profile" className="rounded-circle" width="300" heignt="300"/>

      <h3 className="text-center mb-3">User Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Patient Email</Form.Label>
          <Form.Control type="email" placeholder="user@gmail.com" required />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="123" required />
        </Form.Group>
        <Button type="submit" variant="info" className="w-100">Login</Button>
      </Form>
    </Card>
  );
}

export default UserLogin;
