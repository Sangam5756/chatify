import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
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

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
