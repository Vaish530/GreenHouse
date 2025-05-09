import User from "../models/signup.js";
import { generateTokenForUser } from "../utils/authenticate.js";


export async function handleUserSignUp(req,res)
{
  const{fullName, email,password}=req.body;
  try{
    if(!fullName || !email || !password)
    {
      throw new Error("all fields are required");

    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    const user=await User.create({fullName,email,password});
    const token=await generateTokenForUser(user.id);
    res.status(201).json({token,message:"signup succesfull"});
  } catch(err)
  {
    res.status(400).json({error:err.message});
  }
}

export async function handleUserLogin(req,res)
{
  const{email,password}=req.body;
  console.log("Login Request Data:", req.body);
  try
  {
    const user=await User.findOne({email});
       if (!user) {
      throw new Error("User not found");
    }
     const isPasswordValid = await user.isValidPassword(password);
       if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token=await generateTokenForUser(user.id);
    res.status(200).json({token,message:"login successfull"});
  }
  catch(err)
  {
    res.status(400).json({error:err.message});
  }
}