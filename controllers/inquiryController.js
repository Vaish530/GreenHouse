import Inquiry from "../models/Inquires.js";


export  const postInquiry=async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body); // Ensure req.body matches the schema
    await newInquiry.save();
    res.status(201).json({ message: "Inquiry successfully taken" });
  } catch (err) {
    console.error("Error in saving the inquiry", err);
    res.status(500).json({ error: "Failed to save inquiry" });
  }
};