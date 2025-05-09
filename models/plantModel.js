import mongoose from "mongoose";

const plantSchema=new mongoose.Schema({
  name:
  {
    type:String,
    required:true
  },
  price:
  {
    type:Number,
    required:true
  },
  image:
  {
    type:String,
    required:true
  },
  description:
  {
    type:String,
    required:true,
  },
  category:
  {
    type:String,
  },
  careInstructions: {
    type: String, // Instructions for taking care of the plant
  },
  addedDate: {
    type: Date, // Date when the plant was added
    default: Date.now,
  },

});

const Plant=mongoose.model("Plant",plantSchema);
export default Plant 