import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ThemeDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // Main layout style
  const appStyle = {
    backgroundColor: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  // Card style (for sections/boxes)
  const cardStyle = {
    backgroundColor: darkMode ? "#1e1e1e" : "#f8f9fa",
    color: darkMode ? "#ffffff" : "#000000",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  };

  return (
    <div style={appStyle}>
      <Container className="py-4">
        {/* Toggle Button */}
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </Button>

        {/* Dashboard */}
        <div style={cardStyle}>
          <h1>Dashboard</h1>
          <p>Theme: {darkMode ? "Dark" : "Light"}</p>
        </div>

        {/* Extra Sections */}
        <div style={cardStyle}>
          <h2>Section 1</h2>
          <p>This section also changes with theme.</p>
        </div>

        <div style={cardStyle}>
          <h2>Section 2</h2>
          <p>Dark/Light mode applies everywhere.</p>
        </div>
      </Container>
    </div>
  );
}

export default ThemeDashboard;
