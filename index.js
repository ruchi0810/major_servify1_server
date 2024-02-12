// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoute from "./routes/userRoute.js";
// import serviceProviderRoute from "./routes/serviceProviderRoute.js";
// import reviewRoute from "./routes/reviewRoute.js"; // Import the new route for reviews

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use;

// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log("DB connected successfully");

//     app.listen(PORT, () => {
//       console.log(`server is running`);
//     });
//   })
//   .catch((error) => console.log(error));

// app.use("/api/users", userRoute);
// app.use("/api/service-providers", serviceProviderRoute);
// app.use("/api/reviews", reviewRoute);

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // Import the http module
import { Server } from "socket.io"; // Import the Server class from socket.io
import userRoute from "./routes/userRoute.js";
import serviceProviderRoute from "./routes/serviceProviderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Attach Socket.IO to the HTTP server

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json()); // Add this line to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Add this line to parse incoming form data
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Add your WebSocket event handlers here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/users", userRoute);
app.use("/api/service-providers", serviceProviderRoute);
app.use("/api/reviews", reviewRoute);
app.get("/test-cookie", (req, res) => {
  const tokenExist = req.cookies.token;
  console.log("Token from cookies:", tokenExist);
  res.json({ tokenExist });
});
