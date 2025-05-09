import Articles from "./components/Articles";
import ContactUs from "./components/contactus";
import Main from "./components/Main";
import Body from "./components/products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ContactForm from "./components/ContactForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProduct from "./components/CreateProduct";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!cart.some((item) => item._id === product._id)) {//if the product is not in the cart, it adds it.
      setCart([...cart, product]); // Add product to cart
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId)); // Remove product from cart
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <Body
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cart={cart} removeFromCart={removeFromCart} />
            </ProtectedRoute>
          }
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/inquiries" element={<ContactForm />} />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
