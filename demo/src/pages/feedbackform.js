import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function FeedbackForm() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    rating: "",
    recommend: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.product ||
      !formData.rating ||
      !formData.recommend
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      ...formData,
    };

    const stored = JSON.parse(localStorage.getItem("feedbackList")) || [];
    stored.push(newFeedback);
    localStorage.setItem("feedbackList", JSON.stringify(stored));

    alert("Feedback submitted successfully!");
    navigate("/feedbackdashboard"); 
  };

  return (
    <div className="form-box">
      <h2 className="form-title">Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-input"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
          required
        />
        <input
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Product Name"
          className="form-input"
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          className="form-input"
          required
        />
        <select
          name="recommend"
          value={formData.recommend}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Would Recommend?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Comments"
          className="form-input"
        />
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
