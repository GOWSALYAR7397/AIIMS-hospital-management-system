import React, { useEffect, useState } from "react";

function AmbulancePage() {
  const [ambulances, setAmbulances] = useState([]);

  // Fetch all ambulances
  const fetchAmbulances = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ambulances");
      const data = await res.json();
      setAmbulances(data);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  // Book ambulance
  const bookAmbulance = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/ambulances/book/${id}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      alert(data.message);

      fetchAmbulances(); // refresh list
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/ambulances/cancel/${id}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      alert(data.message);

      fetchAmbulances();
    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Ambulance Booking</h1>

      {ambulances.length === 0 ? (
        <p>No ambulances available</p>
      ) : (
        ambulances.map((ambulance) => (
          <div
            key={ambulance._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{ambulance.vehicleNumber}</h3>
            <p>Driver: {ambulance.driverName}</p>
            <p>Contact: {ambulance.contact}</p>
            <p>Location: {ambulance.location}</p>
            <p>Status: {ambulance.status}</p>

            {ambulance.status === "Available" ? (
              <button onClick={() => bookAmbulance(ambulance._id)}>
                Book Ambulance
              </button>
            ) : (
              <button onClick={() => cancelBooking(ambulance._id)}>
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AmbulancePage;