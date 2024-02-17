// Import necessary models
import User from "../model/userModel.js";
import ServiceProvider from "../model/serviceProviderModel.js";

// API endpoint to check if a user is also a service provider based on email
// export const check_user_is_provider = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the email exists in the User collection
//     const user = await User.findOne({ email });

//     if (user) {
//       return res.status(200).json({ Type: "user" });
//     }

//     // Check if the email exists in the ServiceProvider collection
//     const serviceProvider = await ServiceProvider.findOne({ spemail: email });

//     if (serviceProvider) {
//       return res.status(200).json({ Type: "serviceProvider" });
//     }

//     // If the email is not found in either collection, the user does not exist
//     res.status(404).json({ msg: "User not found" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// API endpoint to check if a user is also a service provider based on email
export const check_user_is_provider = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the User collection
    const user = await User.findOne({ email });

    // Check if the email exists in the ServiceProvider collection
    const serviceProvider = await ServiceProvider.findOne({ spemail: email });

    // If the email exists in either collection, respond with "yes"
    if (user && serviceProvider) {
      return res.status(200).json({ result: "yes" });
    }

    // If the email is not found in either collection, respond with "no"
    res.status(200).json({ result: "no" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
