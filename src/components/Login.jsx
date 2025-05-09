import{Link ,useNavigate} from 'react-router-dom'
import {useState } from "react"

import "../styles/login.css"
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      console.log("form data",formData);
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the JWT token in localStorage
        alert(data.message); // Show success message
        navigate("/products"); // Redirect to the products page
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

return(
  <div className='login-container'>
   <h1>Login</h1>
   <div className='login-form'>
    <form onSubmit={handleSubmit}>
      <div className='form-email'>
        <label> email</label>
        <input type="email" name="email" placeholder='enter your email address'   value={formData.email}
              onChange={handleChange}required/>
      </div>
      <div className='form-password'>
        <label> Password</label>
        <input type="password" name="password"  value={formData.password}
              onChange={handleChange} required/>
      </div>
      <div className='form-signup'>
      <Link to="/signup">Create new Account</Link>
      </div>
      <button type="submit" className='login-button'>Login</button>
    </form>
   </div>


</div>
)
}
