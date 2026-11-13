import { useState } from "react";
import axios from "axios";

import ambulanceMove from "../images/ambulance.png";
import "../App.css";

function Ambulance() {

  const [data, setData] = useState({
    name: "",
    phone: "",
    location: "",
    hospital: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Input Change Handler
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

    setSuccess(false);
  };


  // GET CURRENT LOCATION
  const getLocation = () => {

    if (!navigator.geolocation) {
      alert("Your browser does not support Location");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const currentLocation =
          position.coords.latitude +
          ", " +
          position.coords.longitude;

        setData((prevData) => ({
          ...prevData,
          location: currentLocation
        }));

        alert("✅ Location detected successfully!");

      },

      (error) => {

        console.log("Location Error Code:", error.code);
        console.log("Location Error Message:", error.message);

        if (error.code === 1) {
          alert("Location Permission Denied. Please Allow Location Access.");
        }
        else if (error.code === 2) {
          alert("Location Unavailable. Please check your device location.");
        }
        else if (error.code === 3) {
          alert("Location Request Timed Out. Please try again.");
        }
        else {
          alert("Unable to get your current location.");
        }

      },

      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }

    );

  };


  // BOOK AMBULANCE
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !data.name.trim() ||
      !data.phone.trim() ||
      !data.location.trim() ||
      !data.hospital.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setSuccess(false);

    console.log("Form Data:", data);

    try {

      await axios.post(
        "http://localhost:5000/api/ambulances",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setSuccess(true);

      alert("🚑 Ambulance Booked Successfully!");

      setData({
        name: "",
        phone: "",
        location: "",
        hospital: ""
      });

    }

    catch (err) {

      console.log("Error:", err);

      alert("❌ Booking Failed");

    }

    finally {
      setLoading(false);
    }

  };


  return (

    <div className="ambulance-container">

      <img
        src={ambulanceMove}
        alt="ambulance"
        className="ambulance-animation"
      />

      <div className="ambulance-card">

        <h2
          className="ambulance-title"
          style={{ color: "green" }}
        >
          🚑 Ambulance Booking
        </h2>

        {success && (
          <p style={{ color: "green" }}>
            Ambulance Booked Successfully!
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={data.name}
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="phone"
            value={data.phone}
            placeholder="Phone"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="location"
            value={data.location}
            placeholder="Location"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="hospital"
            value={data.hospital}
            placeholder="Hospital"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Ambulance"}
          </button>


          {/* CALL AMBULANCE */}

          <a
            href="tel:108"
            style={{ textDecoration: "none" }}
          >
            <div style={styles.callButton}>
              📞 Call Ambulance
            </div>
          </a>


          {/* GET CURRENT LOCATION */}

          <button
            type="button"
            style={styles.locationButton}
            onClick={getLocation}
          >
            📍 Get Current Location
          </button>


          {/* GOOGLE MAPS */}

          <button
            type="button"
            style={styles.mapButton}
            onClick={() => {

              if (!data.location.trim()) {
                alert("Please get your current location first");
                return;
              }

              window.open(
                `https://www.google.com/maps?q=${encodeURIComponent(data.location)}`,
                "_blank"
              );

            }}
          >
            🗺 Open in Google Maps
          </button>

        </form>

      </div>

    </div>

  );

}


// STYLES

const styles = {

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  callButton: {
    width: "100%",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },

  locationButton: {
    width: "100%",
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },

  mapButton: {
    width: "100%",
    padding: "10px",
    background: "purple",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  }

};

export default Ambulance;