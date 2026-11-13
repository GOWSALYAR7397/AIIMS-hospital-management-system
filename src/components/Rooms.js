import React, { useEffect, useState } from "react";
import "./Rooms.css";

import general from "../images/general.jpg";
import deluxe from "../images/deluxe.jpg";
import icu from "../images/icu.jpg";
import vip from "../images/vip.jpg";

const API_URL = "http://localhost:5000/api/rooms";

function Rooms() {
  const [roomData, setRoomData] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const [patientName, setPatientName] = useState("");
  const [days, setDays] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Room images
  const roomImages = {
    "General Ward": general,
    "Deluxe Room": deluxe,
    ICU: icu,
    "VIP Suite": vip,

    // Backend default room names
    "Private Room": vip,
    "Semi-Private": deluxe,
  };

  // GET ROOMS FROM MONGODB
  const fetchRooms = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load rooms");
      }

      const data = await response.json();

      setRoomData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // SELECT ROOM
  const handleSelectRoom = (room) => {
    setSelectedRoom(room.roomType);
    setSelectedRoomId(room._id);
    setSuccess("");
    setError("");
  };

  // BOOK ROOM AND SAVE IN MONGODB
  const handleBooking = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!patientName.trim() || !selectedRoomId || !days) {
      setError("Please fill all fields and select a room.");
      return;
    }

    if (Number(days) <= 0) {
      setError("Please enter valid number of days.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/${selectedRoomId}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName: patientName.trim(),
            days: Number(days),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      setSuccess(
        `Booking successful! ${patientName} booked ${selectedRoom} for ${days} days. Total: ₹${result.booking.totalAmount}`
      );

      setPatientName("");
      setSelectedRoom("");
      setSelectedRoomId("");
      setDays("");

      // Refresh room availability from MongoDB
      await fetchRooms();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rooms-page">

      <h1 className="room-title">
        🏨 Hospital Room Booking
      </h1>

      {/* ROOM CARDS */}

      <div className="room-container">

        {roomData.map((room) => (

          <div className="room-card" key={room._id}>

            <img
              src={roomImages[room.roomType] || general}
              alt={room.roomType}
            />

            <h2>{room.roomType}</h2>

            <p>₹ {room.price} / day</p>

            <p>
              Total Rooms: {room.total}
            </p>

            <p>
              Available Rooms: {room.available}
            </p>

            <button
              type="button"
              disabled={room.available <= 0}
              onClick={() => handleSelectRoom(room)}
            >
              {room.available <= 0 ? "Not Available" : "Book Now"}
            </button>

          </div>

        ))}

      </div>

      {/* BOOKING FORM */}

      <div className="booking-form">

        <h2>📝 Booking Form</h2>

        <form onSubmit={handleBooking}>

          <input
            type="text"
            placeholder="Enter Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Selected Room"
            value={selectedRoom}
            readOnly
          />

          <input
            type="number"
            min="1"
            placeholder="Number of Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>

        {success && (
          <div className="success-msg">
            {success}
          </div>
        )}

        {error && (
          <div className="error-msg">
            {error}
          </div>
        )}

      </div>

    </div>
  );
}

export default Rooms;