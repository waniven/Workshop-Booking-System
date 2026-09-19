import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  validatePhoneNumber,
  validateEmail,
  validateString,
} from "../utils/validatorUtil";

export function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchContactDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/contacts/${id}`);
      if (!response.ok)
        throw new Error(`Could not fetch contact entry: ${response.status}`);
      const data = await response.json();
      setContact(data);

      setEditFirstName(data.firstName || "");
      setEditLastName(data.lastName || "");
      setEditPhoneNumber(data.phoneNumber || "");
      setEditEmail(data.email || "");
      setEditAddress(data.address || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    setIsSaving(true);

    if (
      !editFirstName.trim() ||
      !editLastName.trim() ||
      !editPhoneNumber.trim() ||
      !editEmail.trim()
    ) {
      alert("All fields are required. Please fill out every item.");
      setIsSaving(false);
      return;
    }

    if (!validateString(editFirstName)) {
      alert("Invalid First Name. Use only letters, numbers, and spaces.");
      setIsSaving(false);
      return;
    }

    if (!validateString(editLastName)) {
      alert("Invalid Last Name. Use only letters, numbers, and spaces.");
      setIsSaving(false);
      return;
    }

    if (!validateEmail(editEmail)) {
      alert("Invalid Email. follow user@domain.com schema.");
      setIsSaving(false);
      return;
    }

    if (!validatePhoneNumber(editPhoneNumber)) {
      alert("Invalid Phone Number. Use number code e.g +64 or leading 0.");
      setIsSaving(false);
      return;
    }

    const patchPayload = {
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      phoneNumber: editPhoneNumber.trim(),
      email: editEmail.trim(),
      address: editAddress.trim(),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchPayload),
      });

      if (response.ok) {
        alert("Success! contact details updated safely.");
        setContact((prev) => ({
          ...prev,
          firstName: editFirstName.trim(),
          lastName: editLastName.trim(),
          phoneNumber: editPhoneNumber.trim(),
          email: editEmail.trim(),
          address: editAddress.trim(),
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
  if (!contact)
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
          onClick={() => navigate("/contacts")}
          style={{
            marginBottom: "20px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
          disabled={isEditing}
        >
          &larr; Back to System Contacts List
        </button>
      </div>

      <h2>Contact Reference File Profile</h2>

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
            Edit Contact
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
                setEditFirstName(contact.firstName);
                setEditLastName(contact.lastName);
                setEditPhoneNumber(contact.phoneNumber);
                setEditEmail(contact.email);
                setEditAddress(contact.address);
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
          <strong>System Record ID:</strong> {contact._id}
        </div>

        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          <strong>Contact Profile Data:</strong>

          {isEditing ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  First Name:
                </label>
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Phone:
                </label>
                <input
                  type="text"
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Email:
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>
                  Address:
                </label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          ) : typeof contact === "object" && contact !== null ? (
            <div
              style={{
                paddingLeft: "10px",
                marginTop: "5px",
                fontSize: "0.9rem",
              }}
            >
              <div>First Name: {contact.firstName}</div>
              <div>Last Name: {contact.lastName}</div>
              <div>Phone: {contact.phoneNumber}</div>
              <div>Email: {contact.email}</div>
              <div>Address: {contact.address}</div>
            </div>
          ) : (
            <div style={{ paddingLeft: "10px", color: "#666" }}>
              ID Key Ref String: {contact || "N/A"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
