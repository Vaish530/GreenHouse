import "../styles/Cart.css";
import { Link } from "react-router-dom";
export default function Cart({cart,removeFromCart})
  {

return(
<div className="cart-page">
  <div className="cart-layout">
    <aside className="sidebar">
      <h3>Other things to explore</h3>
      <ul>
      <li className="link-page"><Link to="/products">Products</Link></li>
        <li className="link-page"><Link to="/Cart">Your Items</Link></li>
        <li className="link-page"><Link to="/articles">Articles</Link></li>
        <li className="link-page"><Link to="/contactus">Contact Us</Link></li>
      </ul>
    </aside>

    <div className="cart-content">
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img className="cart-image" src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
                <button
                  className="remove-from-cart"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>


 ) }
