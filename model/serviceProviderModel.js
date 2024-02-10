import mongoose from "mongoose";
import Review from "../model/reviewModel.js"; // Import the Review model
import ServiceProvider from "../model/serviceProviderModel.js";
import User from "../model/userModel.js";

const serviceProviderSchema = new mongoose.Schema({
  spname: {
    type: String,
    required: true,
  },
  spmobile: {
    type: String,
    required: true,
  },
  spaddress: {
    type: String,
    required: true,
  },
  spcity: {
    type: String,
    required: true,
  },
  spservicename: {
    type: String,
    required: true,
  },
  spemail: {
    type: String,
    required: true,
  },
  sppassword: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
serviceProviderSchema.pre("findOneAndDelete", async function (next) {
  const serviceProviderId = this._conditions._id;

  // Delete associated reviews
  await Review.deleteMany({ serviceProviderId });

  next();
});
export default mongoose.model("ServiceProvider", serviceProviderSchema);
//table nu naam aekvachan ma
