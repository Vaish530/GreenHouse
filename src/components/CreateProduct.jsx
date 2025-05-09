import {useState} from 'react';
import{useNavigate} from 'react-router-dom';
import "../styles/CreateProduct.css"

export default function CreateProduct()
{

  const[formData,setFormData]=useState({
    name:"",
    price:"",
    image:"null",
    description:"",
    category:"",
    careInstructions:"",  });
    const navigate=useNavigate();
    const handleChange=(e)=>
    {
     const{name,value,files}=e.target;
     if(name==="image")
     {
      setFormData({...formData,[name]:files[0]});
     }else{setFormData({...formData,[name]:value});}
     
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
    
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("image", formData.image); // Append the file
        formDataToSend.append("description", formData.description);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("careInstructions", formData.careInstructions);
    
        const response = await fetch("http://localhost:8000/plants", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // No need for "Content-Type" with FormData
          },
          body: formDataToSend, // Send FormData
        });
    
        if (response.ok) {
          alert("Plant added successfully!");
          navigate("/products");
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to add plant");
        }
      } catch (error) {
        console.error("Error in adding plant:", error);
        alert("An error occurred. Please try again.");
      }
    };
    return(

      <div className='create-product-container'>

        <h1>Add a New plant</h1>
        <form onSubmit={handleSubmit}  enctype="multipart/form-data" >
          <input type="text" name="name" placeholder='plantName' value={formData.name} onChange={handleChange} required/>
          <input type="number" name="price" placeholder='Price' value={formData.price} onChange={handleChange} required/>
          <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} required/>
          <input type="text" name="category" placeholder='Category' value={formData.category} onChange={handleChange} required/>
          <textarea name="careInstructions" placeholder='Care Instructions' value={formData.careInstructions} onChange={handleChange} required/>
          <button type="submit">Add Plant</button>

        </form>
      </div>
    )
}