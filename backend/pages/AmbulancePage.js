import React, { useEffect, useState } from "react";

function AmbulancePage() {
  const [ambulances, setAmbulances] = useState([]);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const [search, setSearch] = useState("");

  // Fetch ambulance list
  const fetchAmbulances = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ambulances");
      const data = await res.json();
      setAmbulances(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  // Add ambulance
  const addAmbulance = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/ambulances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          vehicleNumber,
          driverName,
          contact,
          location
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Ambulance added successfully ✅");

        setVehicleNumber("");
        setDriverName("");
        setContact("");
        setLocation("");

        fetchAmbulances();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error adding ambulance");
    }
  };

  // Book ambulance
  const bookAmbulance = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/ambulances/book/${id}`,
        {
          method: "POST"
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Ambulance booked successfully 🚑");
        fetchAmbulances();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Booking failed");
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/ambulances/cancel/${id}`,
        {
          method: "POST"
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Booking cancelled");
        fetchAmbulances();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Cancel failed");
    }
  };

  // Search
  const filteredAmbulances = ambulances.filter(
    (a) =>
      a.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.driverName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1>🚑 Ambulance Booking System</h1>

      {/* Add Form */}
      <form onSubmit={addAmbulance}>
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Add Ambulance</button>
      </form>

      <br />

      {/* Search */}
      <input
        type="text"
        placeholder="Search ambulance"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      {/* Ambulance List */}
      {filteredAmbulances.map((a) => (
        <div key={a._id}>
          <h3>{a.vehicleNumber}</h3>
          <p>Driver: {a.driverName}</p>
          <p>Contact: {a.contact}</p>
          <p>Location: {a.location}</p>
          <p>Status: {a.status}</p>

          {a.status === "Booked" ? (
            <button onClick={() => cancelBooking(a._id)}>
              Cancel Booking
            </button>
          ) : (
            <button onClick={() => bookAmbulance(a._id)}>
              Book Now
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AmbulancePage;