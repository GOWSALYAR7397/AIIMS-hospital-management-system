
import React, { useState } from "react";
import axios from "axios";

function BloodbankForm() {
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [quantity, setQuantity] = useState(0);
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingUnits, setBookingUnits] = useState("");

  // Add Blood Bank Data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        bloodGroup,
        quantity: Number(quantity),
        available,
      };

      const res = await axios.post(
        "http://localhost:5000/api/bloodbanks",
        data
      );

      console.log("Data inserted:", res.data);

      setMessage("✅ Blood successfully added!");
      setShowBooking(true);
      setQuantity(0);
    } catch (err) {
      console.error(
        "Blood Bank Error:",
        err.response?.data || err.message
      );

      setMessage(
        "❌ " +
          (err.response?.data?.message ||
            "Something went wrong while adding blood!")
      );
    }
  };

  // Blood Booking
  const handleBooking = (e) => {
    e.preventDefault();

    alert(
      "🩸 Blood Booking Confirmed!\nName: " +
        bookingName +
        "\nUnits: " +
        bookingUnits +
        "\nBlood Group: " +
        bloodGroup
    );

    setBookingName("");
    setBookingUnits("");
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1711406192411-2154c5683d34?w=600&auto=format&fit=crop&q=60')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
          width: "350px",
        }}
      >
        <h2>🩸 Blood Bank Entry</h2>

        <form onSubmit={handleSubmit}>
          <label>Blood Group:</label>

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
          </select>

          <br />
          <br />

          <label>Quantity (units):</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <br />
          <br />

          <label>Available:</label>

          <select
            value={available}
            onChange={(e) =>
              setAvailable(e.target.value === "true")
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <br />
          <br />

          <button type="submit">Add Bloodbank</button>
        </form>

        {message && (
          <p style={{ marginTop: "10px" }}>{message}</p>
        )}

        {showBooking && (
          <div style={{ marginTop: "20px" }}>
            <h3>Book Blood</h3>

            <form onSubmit={handleBooking}>
              <label>Your Name:</label>

              <input
                type="text"
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
                required
              />

              <br />
              <br />

              <label>Units Required:</label>

              <input
                type="number"
                min="1"
                value={bookingUnits}
                onChange={(e) => setBookingUnits(e.target.value)}
                required
              />

              <br />
              <br />

              <button type="submit">Confirm Booking</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BloodbankForm;