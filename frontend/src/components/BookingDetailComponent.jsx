import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchBookingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`);
      if (!response.ok)
        throw new Error(`Could not fetch booking entry: ${response.status}`);
      const data = await response.json();
      setBooking(data);

      setEditStatus(data.status || "");
      setEditNotes(data.notes || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const patchPayload = {
      status: editStatus,
      notes: editNotes.trim(),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchPayload),
      });

      if (response.ok) {
        alert("Success! Booking details updated safely.");
        setBooking((prev) => ({
          ...prev,
          status: editStatus,
          notes: editNotes.trim(),
        }));
        setIsEditing(false);
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(
          `Server rejection: ${response.status} ${JSON.stringify(errorBody)}`,
        );
      }
    } catch (err) {
      console.error("Patch update network error:", err);
      alert("Failed to reach server: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading details profile entry...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "30px", color: "#dc3545" }}>
        Error: {error}
      </div>
    );
  if (!booking)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        No profile data record found.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <div>
        <button
          type="button"
          onClick={() => navigate("/bookings")}
          style={{
            marginBottom: "20px",
            padding: "6px 12px",
            backgroundColor: "#5fa8e7",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={isEditing}
        >
          &larr; Back to System Bookings List
        </button>
      </div>

      <h2>Booking Reference File Profile</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
        }}
      >
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            style={{
              padding: "6px 14px",
              backgroundColor: "#5fa8e7",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Edit Booking
          </button>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              style={{
                padding: "6px 14px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditStatus(booking.status);
                setEditNotes(booking.notes);
              }}
              disabled={isSaving}
              style={{
                padding: "6px 14px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <hr
        style={{ margin: "15px 0", border: "0", borderTop: "1px solid #eee" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontSize: "1rem",
        }}
      >
        <div>
          <strong>System Record ID:</strong> {booking._id}
        </div>
        <div>
          <strong>Booking Date:</strong>{" "}
          {new Date(booking.bookingDate).toLocaleDateString("en-NZ")}
        </div>

        <div>
          <strong>Workflow Status Flag:</strong>{" "}
          {isEditing ? (
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              style={{ padding: "4px", marginLeft: "10px", width: "160px" }}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          ) : (
            <span>{booking.status}</span>
          )}
        </div>

        <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
          Associated Information Elements
        </h3>

        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          <strong>Contact Profile Data:</strong>
          {typeof booking.contact === "object" && booking.contact !== null ? (
            <div
              style={{
                paddingLeft: "10px",
                marginTop: "5px",
                fontSize: "0.9rem",
              }}
            >
              <div>
                Name: {booking.contact.firstName} {booking.contact.lastName}
              </div>
              <div>Phone: {booking.contact.phoneNumber}</div>
              <div>Email: {booking.contact.email}</div>
              <div>Address: {booking.contact.address}</div>
            </div>
          ) : (
            <div style={{ paddingLeft: "10px", color: "#666" }}>
              ID Key Ref String: {booking.contact || "N/A"}
            </div>
          )}
        </div>

        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          <strong>Vehicle Profile Data:</strong>
          {typeof booking.vehicle === "object" && booking.vehicle !== null ? (
            <div
              style={{
                paddingLeft: "10px",
                marginTop: "5px",
                fontSize: "0.9rem",
              }}
            >
              <div>Year: {booking.vehicle.year}</div>
              <div>Manufacturer: {booking.vehicle.manufacturer}</div>
              <div>Model: {booking.vehicle.model}</div>
            </div>
          ) : (
            <div style={{ paddingLeft: "10px", color: "#666" }}>
              ID Key Ref String: {booking.vehicle || "N/A"}
            </div>
          )}
        </div>

        <div>
          <strong>Notes:</strong>
          {isEditing ? (
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              style={{
                width: "100%",
                minHeight: "80px",
                marginTop: "5px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontFamily: "sans-serif",
              }}
              placeholder="Enter internal maintenance updates or job remarks here..."
            />
          ) : (
            booking.notes && (
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  borderLeft: "4px solid #6c757d",
                  fontStyle: "italic",
                  backgroundColor: "#f1f3f5",
                }}
              >
                {booking.notes}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
