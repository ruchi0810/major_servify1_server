import mongoose from "mongoose";
import Review from "../model/reviewModel.js"; // Import the Review model
import Rating from "../model/ratingModel.js";
import ServiceProvider from "../model/serviceProviderModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

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
    unique: true,
    validate: {
      validator: function (spemail) {
        const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegx.test(spemail);
      },
      message: "Email format is invalid",
    },
  },
  sppassword: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return password.length >= 6;
      },
      message: "password must be greter than 6 character",
    },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
});
serviceProviderSchema.pre("findOneAndDelete", async function (next) {
  const serviceProviderId = this._conditions._id;

  // Delete associated reviews
  await Review.deleteMany({ serviceProviderId });

  next();
});
serviceProviderSchema.pre("save", async function (next) {
  const serviceprovider = this;
  if (!serviceprovider.isModified("sppassword")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(serviceprovider.sppassword, salt);
    //serviceprovider.sppassword = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});
export default mongoose.model("ServiceProvider", serviceProviderSchema);
//table nu naam aekvachan ma
