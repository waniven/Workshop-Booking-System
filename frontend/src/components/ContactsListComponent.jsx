import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/Contacts");
      if (!response.ok)
        throw new Error(`Failed to load data: ${response.status}`);
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("contact removed successfully.");
        setContacts((prev) => prev.filter((b) => b._id !== id));
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(`Request Error: ${response.status} ${JSON.stringify(errorBody)}`);
      }
    } catch (err) {
      alert("Error processing delete operation: " + err.message);
    }
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
  if (contacts.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        No active contacs found.
      </div>
    );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          marginBottom: "20px",
          paddingBottom: "20px",
        }}
      >
        System Contacts
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {contacts.map((contact) => (
          <div
            key={contact._id}
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
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "6px",
                fontSize: "0.95rem",
              }}
            >
              <strong style={{ color: "#666" }}>Name:</strong>
              <span>
                {`${contact.firstName} ${contact.lastName}`.trim() || "N/A"}
              </span>

              <strong style={{ color: "#666" }}>Phone:</strong>
              <span>
                {contact.phoneNumber?.phoneNumber ||
                  contact.phoneNumber ||
                  "N/A"}
              </span>

              <strong style={{ color: "#666" }}>Email:</strong>
              <span>{contact.email?.email || contact.email || "N/A"}</span>
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
                onClick={() => navigate(`/contacts/${contact._id}`)}
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
                onClick={(e) => handleDelete(contact._id, e)}
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
