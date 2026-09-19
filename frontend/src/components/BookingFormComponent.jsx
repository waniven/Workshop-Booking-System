import { useState } from "react";
import { validateBookingStatus } from "../utils/validatorUtil";

export function BookingFrom() {
  const [bookingDate, setBookingDate] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [parts, setParts] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !bookingDate.trim() ||
      !status.trim() ||
      !contact.trim() ||
      !vehicle.trim()
    ) {
      alert(
        "Please fill in all manditory fields: date, status, contact, and vehicle.",
      );
      return;
    }

    if (!validateBookingStatus(status)) {
      alert("Status must be Pending, In-Progress, Completed, or Cancelled");
      return;
    }

    //check parts ammount used is not < 1

    const formData = {
      bookingDate: bookingDate.trim(),
      status: status.trim(),
      contact: contact,
      vehicle: vehicle,
      //parts: parts,
      notes: notes,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1>Add Booking</h1>

        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Date:
          <input
            type="text"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>

        <label style={{ display: "block" }}>
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
          Submit Part
        </button>
      </form>
    </div>
  );
}
