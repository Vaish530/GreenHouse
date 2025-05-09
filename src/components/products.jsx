import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Products.css";

export default function Body({ cart, addToCart, removeFromCart }) {
  const [plants, setPlants] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Fetch plants from backend
  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch("http://localhost:8000/products");
      const value = await response.json();
      setPlants(value);
    };
    fetchPlants();
  }, []);

  // Check login status and sync across tabs
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setIsAdmin(payload.role === "admin"); // Check if the user is an admin
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleDelete = async (plantId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/plants/${plantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Plant deleted successfully!");
        setPlants(plants.filter((p) => p._id !== plantId)); // Update UI
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete plant");
      }
    } catch (err) {
      console.error("Error deleting plant:", err);
      alert("An error occurred. Please try again.");
    }
  };
 

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>Other things to explore</h3>
        <ul>
          <li className="link-page">
            <Link to="/">Home</Link>
          </li>
          <li className="link-page">
            <Link to="/Cart">Your Items</Link>
          </li>
          <li className="link-page">
            <Link to="/articles">Articles</Link>
          </li>
          <li className="link-page">
            <Link to="/contactus">Contact Us</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="link-page-user">User Logged In</li>
              {isAdmin && (
                <li className="link-page">
                  <Link to="/create-product">Add New Plant</Link>
                </li>
              )}
              <li className="link-page">
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="link-page">
              <Link to="/login">Login/Signup</Link>
            </li>
          )}
        </ul>
      </aside>

      <div className="product-container">
        {plants.map((plant) => (
          <div className="card" key={plant._id}>
            <div className="image-container">
              <img className="plant-image" src={plant.image} alt={plant.name} />
              <div className="plant-description">{plant.description}</div>
            </div>
            <div className="plant-content">
              <h2 className="plant-title">{plant.name}</h2>
              <h3 className="plant-price">Price: ${plant.price}</h3>
              <p className="plant-category">Category: {plant.category}</p>
              <div>
                <p>
                  Care Instructions<li>{plant.careInstructions}</li>
                </p>
              </div>
              <p className="plant-date">Added on: {plant.addedDate}</p>
              <button
                className="add-to-cart"
                onClick={() =>
                  cart.some((item) => item._id === plant._id)
                    ? removeFromCart(plant._id)
                    : addToCart(plant)
                }
              >
                {cart.some((item) => item._id === plant._id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </button>
               <button className=" buy-now" >Plant Now</button>
              {isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(plant._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>You need to log in to add items to the cart.</p>
            <div className="modal-buttons">
              <button onClick={() => navigate("/login")}>Go to Login</button>
              <button onClick={() => setShowLoginPrompt(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}