import Plant from "../models/plantModel.js"

export const getAllProductPlants=async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    console.error("Error in fetching the data", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const addPlant=async (req, res) => {
  try {
    const newProduct = new Plant(req.body); // Ensure req.body matches the Plant schema
    await newProduct.save();
    res.status(201).json({ message: "Product successfully added!" });
  } catch (err) {
    console.error("Error in saving the product", err);
    res.status(500).json({ error: "Failed to save product" });
  }
}

export const addPlantForm= async (req, res) => {
  
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  const { name, price, description, category, careInstructions } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const plant = new Plant({ name, price, image, description, category, careInstructions });
    await plant.save();
    res.status(201).json({ message: "Plant added successfully", plant });
  } catch (err) {
    res.status(500).json({ error: "Failed to add plant" });
  }
};

export const deletePlant= async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete plant" });
  }
}