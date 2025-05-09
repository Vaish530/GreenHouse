import {Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import "../styles/signup.css"
export default function SignUp() {
 const [formData,setFormData]=useState({

  fullName :"",
  email:"",
  password:"",
 });
 const navigate=useNavigate();
 const handleChange=(e)=>
 {
  const {name,value}=e.target;
  setFormData({...formData,[name]:value});
 };
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  try {
    const response = await fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message); // Show success message
      navigate("/login"); // Redirect to login page
    } else {
      const errorData = await response.json();
      alert(errorData.error); // Show error message
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  }
};


  return(
    
    <div className='signup-container'>
     <h1>SignUp</h1>
     <div className="sign-up-form">
     <form onSubmit={handleSubmit}>
      <div className='sign-name'>
        <label>Fullname</label>
        <input type="text" name="fullName" placeholder='enter your name'  value={formData.fullName}
              onChange={handleChange}required/>
      </div>
      <div className='sign-email'>
        <label> E-mail</label>
        <input type="email" name="email" placeholder='enter your email'value={formData.email}
              onChange={handleChange} required/>
      </div>
      <div className='sign-password'>
        <label> password</label>
        <input type="password" name="password" value={formData.password}
              onChange={handleChange} required/>
      </div>
      <div className='form-login'>
      <Link to="/login">Already a user login</Link>
      </div>
      <button type="submit" className="sign-button">Sign Up</button>
      </form>
     </div>
      </div>
  )
}