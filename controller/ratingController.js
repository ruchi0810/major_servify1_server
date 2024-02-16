import Rating from "../model/ratingModel.js";
import ServiceProvider from "../model/serviceProviderModel.js";
import { io } from "../index.js";

export const createRating = async (req, res) => {
  try {
    const ratingData = new Rating(req.body);
    const savedData = await ratingData.save();
    io.emit("newRating", savedData);
    console.log("Emitted newRating event");
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
