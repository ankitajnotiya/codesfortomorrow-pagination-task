import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Your CSS

export default function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: Clear login/session data
    // localStorage.removeItem("authToken");
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbackList")) || [];
    setFeedbackList(stored);
    setFilteredList(stored);
  }, []);

  useEffect(() => {
    let list = [...feedbackList];
    if (ratingFilter) {
      list = list.filter((item) => item.rating === ratingFilter);
    }
    if (productFilter) {
      list = list.filter((item) =>
        item.product.toLowerCase().includes(productFilter.toLowerCase())
      );
    }
    setFilteredList(list);
  }, [ratingFilter, productFilter, feedbackList]);

  const renderStars = (count) => "⭐️".repeat(Number(count));

  const handleDelete = (id) => {
    const updatedList = feedbackList.filter((item) => item.id !== id);
    setFeedbackList(updatedList);
    localStorage.setItem("feedbackList", JSON.stringify(updatedList));
  };

  const getAverageRating = () => {
    if (feedbackList.length === 0) return 0;
    const total = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
    return (total / feedbackList.length).toFixed(1);
  };

  const getRecommendRate = () => {
    if (feedbackList.length === 0) return "0%";
    const recommended = feedbackList.filter((item) => item.recommend === "true").length;
    return `${Math.round((recommended / feedbackList.length) * 100)}%`;
  };

  return (
    <div id="appLayout" className="page active">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <h1 className="nav-title">Feedback Dashboard</h1>
            <div className="nav-links">
              <a href="/feedbackform" className="nav-link">
                <i className="fas fa-comment"></i>  Feedback Form
              </a>
            </div>
          </div>
          <div className="nav-right">
            <button className="btn btn-ghost" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Feedback Dashboard</h1>
            <p>Manage and analyze customer feedback</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Feedback</span>
              <i className="fas fa-chart-bar stat-icon"></i>
            </div>
            <div className="stat-value">{feedbackList.length}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Average Rating</span>
              <i className="fas fa-star stat-icon"></i>
            </div>
            <div className="stat-value">{getAverageRating()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Recommendation Rate</span>
              <i className="fas fa-thumbs-up stat-icon"></i>
            </div>
            <div className="stat-value">{getRecommendRate()}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-card">
          <div className="filter-header">
            <h3><i className="fas fa-filter"></i> Filters</h3>
          </div>
          <div className="filter-content">
            <div className="filter-group">
              <label htmlFor="ratingFilter">Filter by Rating</label>
              <select
                id="ratingFilter"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="productFilter">Filter by Product</label>
              <input
                type="text"
                id="productFilter"
                placeholder="Search products..."
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setRatingFilter("");
                setProductFilter("");
              }}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Feedback List */}
        <div className="feedback-list">
          {filteredList.length === 0 ? (
            <div className="no-feedback">
              <p>No feedback submitted yet. Start by adding some feedback!</p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div key={item.id} className="feedback-card">
                <div className="feedback-header">
                  <div className="feedback-info">
                    <h4>{item.name}</h4>
                    <p>{item.email}</p>
                  </div>
                  <div className="feedback-actions">
                    <button className="btn btn-outline" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="feedback-content">
                  <div className="feedback-details">
                    <div className="rating-row">
                      <div className="rating-display">
                        <span>Rating:</span>
                        <div className="stars">{renderStars(item.rating)}</div>
                      </div>
                      <div className={`recommend-status ${item.recommend === "true" ? "positive" : "negative"}`}>
                        <i className={`fas ${item.recommend === "true" ? "fa-thumbs-up" : "fa-thumbs-down"}`}></i>
                        {item.recommend === "true" ? "Recommended" : "Not Recommended"}
                      </div>
                    </div>
                    <p className="feedback-comment"><strong>Product:</strong> {item.product}</p>
                    <p className="feedback-comment"><strong>Comments:</strong> {item.comments}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
