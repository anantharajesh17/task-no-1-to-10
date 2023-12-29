const Image = require("../model/imgUser");
const error = require('../middleware/errorHandling');
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving images" });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const image = new Image({ filename: originalname, data: buffer });
    await image.save();
    res.json({ message: "File uploaded successfully", image });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalname, buffer } = req.file;
    const updatedImage = { filename: originalname, data: buffer };
    await Image.findByIdAndUpdate(id, updatedImage);
    const image = await Image.findById(id);
    res.json({ message: "File updated successfully", image });
  } catch (error) {
    res.status(500).json({ error: "Error updating file" });
  }
};

module.exports = { uploadImage, updateImage, getAllImages };
