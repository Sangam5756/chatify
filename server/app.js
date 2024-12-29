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
    origin: "https://chat-app12-nu.vercel.app",
    credentials: true,
  })
);
// socket  created /also cors because server and client on different origin
const io = new Server(server, {
  cors: {
    origin: process.env.LocalUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket connection created
io.on("connection", (socket) => {
  console.log("user connected" + socket.id);


  // just take name from frontend and create room
  socket.on("join-room", ({ roomName, userInput }) => {
    console.log(roomName);
    // When Room Name is Not there
    if (roomName === "") {
      socket.emit("join-message", {
        message: "Enter Valid  room Name",
        inRoom: false,
      });
    } else {
      // // joined the room
      socket.join(roomName);
      // send the aknowledgement to user as connected
      io.to(roomName).emit("join-message", {
        message: `${userInput} joined the room`,
        inRoom: true,
        name: roomName,
        username: userInput,
      });
      console.log("room joined ");
    }
  });

  socket.on("message", ({ message, room, username }) => {
    io.to(room).emit("received-message", { message, room, username });
  });


  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});



server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
