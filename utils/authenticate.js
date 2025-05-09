import jwt from "jsonwebtoken";
import User from "../models/signup.js";

const JWT_SECRET="99491384";
export async function generateTokenForUser(id){
  const user=await User.findById(id);
  const payload={
    _id:user._id,
    email:user.email,
    fullName:user.fullName,
    role:user.role,
  };
  return jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});
}
export function validateToken(token)
{
  return jwt.verify(token,JWT_SECRET);
}