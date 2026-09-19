import { ContactForm } from "./ContactFromComponent";
import { useState } from "react";
import { validateBookingStatus } from "../utils/validatorUtil";

export function BookingFrom() {
  const [showAddContactForm, setShowAddContactForm] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [parts, setParts] = useState("");
  const [notes, setNotes] = useState("");

  const toggleAddContactFormVisibility = () => {
    setShowAddContactForm(!showAddContactForm);
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    if (
      !bookingDate.trim() ||
      !status.trim() ||
      !contact.trim() ||
      !vehicle.trim()
    ) {
      alert(
        "Please fill in all mandatory fields: date, status, contact, and vehicle.",
      );
      return;
    }

    if (!validateBookingStatus(status)) {
      alert("Status must be Pending, In-Progress, Completed, or Cancelled");
      return;
    }

    const formData = {
      bookingDate: bookingDate.trim(),
      status: status.trim(),
      contact: contact,
      vehicle: vehicle,
      notes: notes,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Success! booking data saved to the system.");
        setBookingDate("");
        setStatus("");
        setContact("");
        setVehicle("");
        setParts("");
        setNotes("");
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(`Server error: ${response.status} ${JSON.stringify(errorBody)}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: Could not connect to the server: " + error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        gap: "20px",
      }}
    >
      {showAddContactForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "330px",
          }}
        >
          <ContactForm
            onSaveSuccess={(contactObj) => {
              setContact(contactObj._id);
              setShowAddContactForm(false);
            }}
          />
          <button
            type="button"
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              alignSelf: "center",
              display: "block",
              margin: "10px auto 0",
            }}
            onClick={toggleAddContactFormVisibility}
          >
            Close Add Contact
          </button>
        </div>
      )}

      {!showAddContactForm && (
        <form
          onSubmit={handleBookingSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h1>Add Booking</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label htmlFor="date-picker">Select a Date: </label>
            <input
              type="date"
              id="date-picker"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="" disabled hidden>
                Select Status
              </option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Contact:
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <button
            type="button"
            style={{
              padding: "8px 16px",
              alignSelf: "center",
              display: "block",
              margin: "10px auto 0",
            }}
            onClick={toggleAddContactFormVisibility}
          >
            Add Contact
          </button>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Vehicle:
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Parts:
            <input
              type="text"
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Notes:
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              alignSelf: "center",
            }}
          >
            Submit Booking
          </button>
        </form>
      )}
    </div>
  );
}
