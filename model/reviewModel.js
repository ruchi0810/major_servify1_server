import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  reviews: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Review", reviewSchema);
