import { useState } from "react";
import {
  validatePhoneNumber,
  validateEmail,
  validateString,
} from "../utils/validatorUtil";

export function ContactForm({ onSaveSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !phoneNumber.trim() ||
        !email.trim()
      ) {
        alert("All fields are required. Please fill out every item.");
        return;
      }

      if (!validateString(firstName)) {
        alert("Invalid First Name. Use only letters, numbers, and spaces.");
        return;
      }

      if (!validateString(lastName)) {
        alert("Invalid Last Name. Use only letters, numbers, and spaces.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid Email. follow user@domain.com schema.");
        return;
      }

      if (!validatePhoneNumber(phoneNumber)) {
        alert("Invalid Phone Number. Use number code e.g +64 or leading 0.");
        return;
      }

      const formData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber,
        email: email.toLowerCase().trim(),
        address: address.trim(),
      };

      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedContact = await response.json();
        alert("Success! Contact data saved to the system.");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setAddress("");

        if (onSaveSuccess) onSaveSuccess(savedContact);
      } else {
        const errorBody = await response.json().catch(() => ({}));
        alert(`Server error: ${response.status} ${JSON.stringify(errorBody)}`);
      }
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "330px",
        }}
      >
        <h2>Add Contact</h2>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          Save Contact
        </button>
      </form>
    </div>
  );
}
