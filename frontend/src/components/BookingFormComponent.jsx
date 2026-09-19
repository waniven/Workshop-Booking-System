import { ContactForm } from "./ContactFormComponent";
import { VehicleForm } from "./VehicleFormComponent";
import { DBDropdown } from "./DBDropdown";
import { useState } from "react";
import { validateBookingStatus } from "../utils/validatorUtil";

export function BookingForm() {
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

  const [contactRefresh, setContactRefresh] = useState(0);
  const [vehicleRefresh, setVehicleRefresh] = useState(0);

  const [bookingDate, setBookingDate] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [notes, setNotes] = useState("");

  const toggleAddContactFormVisibility = () =>
    setShowAddContactForm(!showAddContactForm);
  const toggleAddVehicleFormVisibility = () =>
    setShowAddVehicleForm(!showAddVehicleForm);

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

    const isoFormattedDate = new Date(bookingDate).toISOString();

    const formData = {
      bookingDate: isoFormattedDate,
      status: status.trim(),
      contact,
      vehicle,
      notes,
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
              setContactRefresh((prev) => prev + 1);
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

      {showAddVehicleForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "330px",
          }}
        >
          <VehicleForm
            onSaveSuccess={(vehicleObj) => {
              setVehicle(vehicleObj._id);
              setVehicleRefresh((prev) => prev + 1);
              setShowAddVehicleForm(false);
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
            onClick={toggleAddVehicleFormVisibility}
          >
            Close Add Vehicle
          </button>
        </div>
      )}

      {!showAddContactForm && !showAddVehicleForm && (
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
              style={{ marginLeft: "10px", width: "210px" }}
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

          <DBDropdown
            label="Contact"
            endpoint="http://localhost:3000/api/contacts"
            value={contact}
            onChange={setContact}
            refreshTrigger={contactRefresh}
            renderOptionText={(c) => `${c.firstName} ${c.lastName}`}
          />

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

          <DBDropdown
            label="Vehicle"
            endpoint="http://localhost:3000/api/vehicles"
            value={vehicle}
            onChange={setVehicle}
            refreshTrigger={vehicleRefresh}
            renderOptionText={(v) => `${v.year} ${v.manufacturer} ${v.model}`}
          />

          <button
            type="button"
            style={{
              padding: "8px 16px",
              alignSelf: "center",
              display: "block",
              margin: "10px auto 0",
            }}
            onClick={toggleAddVehicleFormVisibility}
          >
            Add Vehicle
          </button>

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
              style={{ marginLeft: "10px", width: "200px" }}
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
