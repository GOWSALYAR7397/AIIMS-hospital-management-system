import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: email.trim(),
          password: password,
          role: "admin",
        }
      );

      if (res.data.success) {
        alert("✅ Login Successful");

        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "❌ Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: "25rem" }} className="shadow p-4">

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgno5S1iuqN-9Dl4poZ0mtk_txSA6QJ7SCw&s"
          alt="profile"
          className="rounded-circle mx-auto d-block mb-3"
          width="150"
          height="150"
        />

        <h3 className="text-center mb-4">Admin Login</h3>

        <Form onSubmit={handleLogin}>

          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </Form>
      </Card>
    </Container>
  );
}

export default AdminLogin;