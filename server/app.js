import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const https = require("https");
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
// server creation
const server = new createServer(app);
app.use(
  cors({
    origin: process.env.ProductionUrl,
    credentials: true,
  })
);
// socket  created /also cors because server and client on different origin
const io = new Server(server, {
  cors: {
    origin: process.env.ProductionUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = [];

// socket connection created
io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  // just take name from frontend and create room
  socket.on("join-room", ({ roomName, userInput }) => {
    // When Room Name is Not there
    if (roomName === "") {
      socket.emit("join-message", {
        message: "Enter Valid  room Name",
        inRoom: false,
      });
    } else {
      // Add user to the users array only if not already present
        socket.join(roomName);
      // // joined the room
      // send the aknowledgement to user as connected
      io.to(roomName).emit("join-message", {
        message: `${userInput} joined the room`,
        inRoom: true,
        name: roomName,
        username: userInput,
      });
    }
  });

  // received the
  socket.on("message", ({ message, room, username }) => {
    io.to(room).emit("received-message", { message, room, username });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    users.pop(socket._id)
    
     // Optionally, emit a message to the room that the user has disconnected
     io.emit("user-disconnected", { socketId: socket.id });

     // Update the room's user list
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World", up: true });
});

const url = "https://ai-coder-cogm.onrender.com/get-tasks";

// Function to make a GET request and log the URL
const fetchData = () => {
  https.get(url, (response) => {
    console.log(`Called URL: ${url}`); // Log the called URL
    response.on("data", (chunk) => {
      // Optionally, you can log the data if needed
      // console.log(chunk.toString());
    });
  }).on("error", (error) => {
    console.error("Error fetching data:", error);
  });
};

// Call the URL immediately
fetchData();

// Call the URL every 8 minutes (480,000 milliseconds)
setInterval(fetchData, 480000); // 8 minutes = 480,000 milliseconds

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
