import { useState } from "react";
import "../styles/ContactForm.css";
import { useNavigate } from "react-router-dom";

export default function ContactForm() 
{


  const[formData,setFormData]=useState({
    name:"",
    email:"",
    inquiryType:"",
    message:"",
  });
  const[successMessage,setSuccessMessage]=useState("");
  const navigate=useNavigate();

  const handleChange=(e)=>
  {
    const{name,value}=e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Ensure formData matches the schema
      });
  
      if (response.ok) {
       
        setFormData({
          name: "",
          email: "",
          inquiryType: "",
          message: "",
        });
        window.alert("your enquiry was succesfully taken by clicking ok button you navigate to contact page ");
        navigate("/contactus")
      } else {
        console.error("Error in submitting the form. Please fill in the details correctly.");
      }
    } catch (err) {
      console.error("Error in submitting the form:", err);
    }
  };
      
    
  
  return(
    <div className="main-contact-container">
    <div className="contact-container">
      <marquee><h2>Submit your inquirires</h2></marquee>
      <form   onSubmit={handleSubmit}>
        <div className="contact-form">
        <div className="name">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name}
          onChange={handleChange} />
        </div>
        <div className="name">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email}
          onChange={handleChange} />
        </div>
        <div className="name">
          <label>Inquiry Type:</label>
          <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}>
             <option value="">Select</option>
            <option value="Plant Damage">Plant Damage</option>
            <option value="Bulk Order">Bulk Order</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="name">
          <label>Message:</label>
          <textarea  name="message" value={formData.message}
          onChange={handleChange} ></textarea>
        </div>
        <button className="name"type="submit">Submit</button>
        </div>
              </form>
              {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
    </div>
  
  )
};
