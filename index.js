// // import express from "express";
// // import mongoose from "mongoose";
// // import bodyParser from "body-parser";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import http from "http"; // Import the http module
// // import { Server } from "socket.io"; // Import the Server class from socket.io
// // import userRoute from "./routes/userRoute.js";
// // import serviceProviderRoute from "./routes/serviceProviderRoute.js";
// // import reviewRoute from "./routes/reviewRoute.js";
// // import cookieParser from "cookie-parser";

// // const app = express();
// // const server = http.createServer(app); // Create an HTTP server
// // const io = new Server(server); // Attach Socket.IO to the HTTP server

// // app.use(bodyParser.json());
// // app.use(cookieParser());
// // app.use(express.json()); // Add this line to parse incoming JSON requests
// // app.use(express.urlencoded({ extended: true })); // Add this line to parse incoming form data
// // app.use(cors());
// // dotenv.config();

// // const PORT = process.env.PORT || 7000;
// // const URL = process.env.MONGOURL;

// // mongoose
// //   .connect(URL)
// //   .then(() => {
// //     console.log("DB connected successfully");

// //     server.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //   })
// //   .catch((error) => console.log(error));

// // // WebSocket connection handling
// // io.on("connection", (socket) => {
// //   console.log("A user connected");

// //   // Add your WebSocket event handlers here

// //   socket.on("disconnect", () => {
// //     console.log("User disconnected");
// //   });
// // });

// // app.use("/api/users", userRoute);
// // app.use("/api/service-providers", serviceProviderRoute);
// // app.use("/api/reviews", reviewRoute);

// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import userRoute from "./routes/userRoute.js";
// import serviceProviderRoute from "./routes/serviceProviderRoute.js";
// import reviewRoute from "./routes/reviewRoute.js";
// import cookieParser from "cookie-parser";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Replace with your React app's origin
//     methods: ["GET", "POST"],
//   },
// });

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CORS middleware

// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log("DB connected successfully");

//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

// // WebSocket connection handling
// io.on("connection", (socket) => {
//   //console.log("A user connected");

//   // Add your WebSocket event handlers here

//   socket.on("disconnect", () => {
//     //console.log("User disconnected");
//   });
// });

// app.use("/api/users", userRoute);
// app.use("/api/service-providers", serviceProviderRoute);
// app.use("/api/reviews", reviewRoute);

//2nd tryyyyyyyyyyyyyyyyy imp
// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http"; // Import the http module
// import { Server } from "socket.io"; // Import the Server class from socket.io
// import userRoute from "./routes/userRoute.js";
// import serviceProviderRoute from "./routes/serviceProviderRoute.js";
// import reviewRoute from "./routes/reviewRoute.js";
// import cookieParser from "cookie-parser";

// const app = express();
// const server = http.createServer(app); // Create an HTTP server
// //const io = new Server(server); // Attach Socket.IO to the HTTP server
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.json()); // Add this line to parse incoming JSON requests
// app.use(express.urlencoded({ extended: true })); // Add this line to parse incoming form data
// app.use(cors());
// // app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CORS middleware
// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log("DB connected successfully");

//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

// // WebSocket connection handling
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Add your WebSocket event handlers here

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
// export { io };

// app.use("/api/users", userRoute);
// app.use("/api/service-providers", serviceProviderRoute);
// app.use("/api/reviews", reviewRoute);

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // Import the createServer function from http
import { Server } from "socket.io"; // Import the Server class from socket.io
import userRoute from "./routes/userRoute.js";
import serviceProviderRoute from "./routes/serviceProviderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import check_user_is_providerRoute from "./routes/check_user_is_provider_Route.js";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = createServer(app); // Create an HTTP server using createServer
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
io.setMaxListeners(3);
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    httpServer.listen(PORT, () => {
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

export { io };

app.use("/api/users", userRoute);
app.use("/api/service-providers", serviceProviderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/check", check_user_is_providerRoute);
