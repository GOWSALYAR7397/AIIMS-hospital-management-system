
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/patients";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
  });

  const [loading, setLoading] = useState(true);

  // Get patients from MongoDB
  const fetchPatients = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.log("Fetch Error:", error);
      alert("Unable to load patients. Check Backend!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const bgStyle = {
    backgroundImage: "url('/images/bg-dashboard.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    color: "#6af092ff",
  };

  const cardStyle = {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  };

  // Add Patient
  const handleAddPatient = async () => {
    if (
      !newPatient.name.trim() ||
      !newPatient.age ||
      !newPatient.gender.trim() ||
      !newPatient.disease.trim()
    ) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPatient.name.trim(),
          age: Number(newPatient.age),
          gender: newPatient.gender.trim(),
          disease: newPatient.disease.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Patient not saved");
      }

      alert("Patient added successfully!");

      setNewPatient({
        name: "",
        age: "",
        gender: "",
        disease: "",
      });

      await fetchPatients();

    } catch (error) {
      console.log("Add Patient Error:", error);
      alert(error.message);
    }
  };

  // Delete Patient
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      alert("Patient deleted successfully!");

      await fetchPatients();

    } catch (error) {
      console.log("Delete Error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={bgStyle}>
      <h2>Patients Details</h2>

      {/* Add Patient Form */}
      <div style={cardStyle}>
        <input
          type="text"
          placeholder="Name"
          value={newPatient.name}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              name: e.target.value,
            })
          }
          style={{ marginRight: "5px" }}
        />

        <input
          type="number"
          placeholder="Age"
          value={newPatient.age}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              age: e.target.value,
            })
          }
          style={{ marginRight: "5px", width: "60px" }}
        />

        <input
          type="text"
          placeholder="Gender"
          value={newPatient.gender}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              gender: e.target.value,
            })
          }
          style={{ marginRight: "5px", width: "80px" }}
        />

        <input
          type="text"
          placeholder="Disease"
          value={newPatient.disease}
          onChange={(e) =>
            setNewPatient({
              ...newPatient,
              disease: e.target.value,
            })
          }
          style={{ marginRight: "5px" }}
        />

        <button onClick={handleAddPatient}>
          Add Patient
        </button>
      </div>

      {/* Patients Table */}
      {loading ? (
        <h4>Loading Patients...</h4>
      ) : (
        <table
          style={{
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #fff", padding: "5px" }}>
                Name
              </th>
              <th style={{ border: "1px solid #fff", padding: "5px" }}>
                Age
              </th>
              <th style={{ border: "1px solid #fff", padding: "5px" }}>
                Gender
              </th>
              <th style={{ border: "1px solid #fff", padding: "5px" }}>
                Disease
              </th>
              <th style={{ border: "1px solid #fff", padding: "5px" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                  No Patients Found
                </td>
              </tr>
            ) : (
              patients.map((p) => (
                <tr key={p._id}>
                  <td style={{ border: "1px solid #990000ff", padding: "5px" }}>
                    {p.name}
                  </td>

                  <td style={{ border: "1px solid #0ca35cff", padding: "5px" }}>
                    {p.age}
                  </td>

                  <td style={{ border: "1px solid #4b1ebcff", padding: "5px" }}>
                    {p.gender}
                  </td>

                  <td style={{ border: "1px solid #f2136cff", padding: "5px" }}>
                    {p.disease}
                  </td>

                  <td style={{ border: "1px solid #d9a60eff", padding: "5px" }}>
                    <button onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Patients;