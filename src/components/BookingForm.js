import React from "react";
import { useLocation } from "react-router-dom";

function BookingForm() {
  const location = useLocation();
  const ambulance = location.state?.ambulance;

  return (
    <div className="container my-3">
      <h2>Ambulance Booking</h2>
      {ambulance ? (
        <div>
          <p><strong>Ambulance:</strong> {ambulance.name}</p>
          <p><strong>Contact:</strong> {ambulance.contact}</p>
          <p><strong>Location:</strong> {ambulance.location}</p>

          <form>
            <div className="mb-3">
              <label className="form-label">Patient Name</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Pickup Location</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Drop Location</label>
              <input type="text" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-success">
              Confirm Booking
            </button>
          </form>
        </div>
      ) : (
        <p>No ambulance selected.</p>
      )}
    </div>
  );
}

export default BookingForm;