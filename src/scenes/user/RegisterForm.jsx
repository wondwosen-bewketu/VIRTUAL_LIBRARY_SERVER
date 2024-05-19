import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUserAsync } from "../../redux/slice/userSlice";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    preference: [],
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the role to the form data before dispatching
      const userData = {
        ...formData,
        role: "user",
      };

      await dispatch(postUserAsync(userData));
      setFormData({
        fullName: "",
        phoneNumber: "",
        password: "",
        preference: [],
        age: "",
      });
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div
      style={{
        width: "50%", // Change this to your desired width
        maxWidth: "none", // Disable maximum width
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Register
      </h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="fullName"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="phoneNumber"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="age" style={{ fontWeight: "bold", color: "#555" }}>
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="preference"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Preference
          </label>
          <select
            id="preference"
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          >
            <option value="">Select Preference</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Mystery</option>
            <option value="Fantasy">Thriller</option>
            <option value="Fantasy">Romance</option>
            <option value="Fantasy">Historical Fiction</option>
            <option value="Fantasy">Literary Fiction</option>
            <option value="Contemporary Fiction">Contemporary Fiction</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Western">Western</option>
            <option value="Humor">Humor</option>
            <option value="Biography/Autobiography">
              Biography/Autobiography
            </option>
            <option value="Self-Help">Self-Help</option>
            <option value="Poetry">Poetry</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="register-btn"
          style={{
            backgroundColor: "#ff6f61",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "12px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Register
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
