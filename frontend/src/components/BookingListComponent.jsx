import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/bookings");
      if (!response.ok)
        throw new Error(`Failed to load data: ${response.status}`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Booking removed successfully.");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(`Request Error: ${response.status} ${JSON.stringify(errorBody)}`);
      }
    } catch (err) {
      alert("Error processing delete operation: " + err.message);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-NZ", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading records...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "30px", color: "#721c24" }}>
        Error: {error}
      </div>
    );
  if (bookings.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        No active bookings found.
      </div>
    );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          marginBottom: "0px",
          paddingBottom: "20px",
        }}
      >
        System Bookings
      </h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <button
          type="button"
          onClick={() => navigate(`/bookings/create`)}
          style={{
            padding: "6px 14px",
            backgroundColor: "#5fa8e7",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Booking
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "600", fontSize: "1.05rem" }}>
                {formatDate(booking.bookingDate)}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: "#e2e3e5",
                }}
              >
                {booking.status}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "6px",
                fontSize: "0.95rem",
              }}
            >
              <strong style={{ color: "#666" }}>Contact:</strong>
              <span>
                {typeof booking.contact === "object" && booking.contact !== null
                  ? `${booking.contact.firstName} ${booking.contact.lastName}`
                  : booking.contact || "N/A"}
              </span>

              <strong style={{ color: "#666" }}>Vehicle:</strong>
              <span>
                {typeof booking.vehicle === "object" && booking.vehicle !== null
                  ? `${booking.vehicle.year} ${booking.vehicle.manufacturer} ${booking.vehicle.model}`
                  : booking.vehicle || "N/A"}
              </span>
            </div>

            {/* Footer Buttons Action Layout */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => navigate(`/bookings/${booking._id}`)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
              <button
                type="button"
                onClick={(e) => handleDelete(booking._id, e)}
                style={{
                  padding: "6px 14px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
