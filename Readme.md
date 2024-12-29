
# Chatify - Real-time Chat Application

Chatify is a real-time chat application built using **Node.js**, **Express**, and **Socket.io** for the backend, with a **React.js** frontend. The platform allows users to join chat rooms, send and receive messages in real time, and communicate with others seamlessly.

## Features

- **Real-Time Messaging**: Users can send and receive messages instantly using WebSockets.
- **Room-based Communication**: Users can join specific chat rooms to interact with other users in the same room.
- **Message Display**: Messages are displayed in real-time with differentiating styles for the current user and other users.
- **Simple UI**: A user-friendly interface built with React and styled using Tailwind CSS for a responsive experience.

## How To Use

### Joining a Room
1. Upon loading the app, you will be prompted to input your name and select a room to join.
2. Once joined, you can start chatting with others in the same room.

### Sending Messages
1. After joining the room, you can send messages by typing in the message box and clicking "Send".
2. Messages will be broadcast to all users currently in the room in real-time.

### Leaving a Room
1. **Disconnecting from the server**: it provide a specific button to leave a room or closing the tab will disconnect the user from the chat.



## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **React.js** (Frontend)
- **Socket.io** for real-time communication

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```

### 2. Install Dependencies

Install the backend dependencies:

```bash
cd backend
npm install
```

Install the frontend dependencies:

```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the **backend** directory with the following variables:

```env
PORT=5000
ProductionUrl=http://localhost:3000  # Replace with your frontend URL
```

### 4. Start the Application

In the **backend** directory, start the server:

```bash
npm start
```

In the **frontend** directory, start the React app:

```bash
npm start
```

The backend will be running on `http://localhost:5000`, and the frontend will be available at `http://localhost:3000`.

## Application Structure

### Backend (Express + Socket.io)

- **server.js**: Initializes the Express app and sets up the Socket.io server for real-time messaging.
- **Socket.io Setup**: The `io.on('connection')` event manages user connections and messages in different rooms.

#### Key Functions:

1. **Join Room**: Allows users to join a room by sending a `roomName` and `userInput` (username).
   ```js
   socket.on('join-room', ({ roomName, userInput }) => {
     // Logic for joining the room
   });
   ```

2. **Send Message**: Listens for `message` events and broadcasts the message to all users in the room.
   ```js
   socket.on('message', ({ message, room, username }) => {
     io.to(room).emit('received-message', { message, room, username });
   });
   ```

3. **Handle Disconnects**: Logs when users disconnect.
   ```js
   socket.on('disconnect', () => {
     console.log('User Disconnected', socket.id);
   });
   ```

### Frontend (React.js)

- **App.js**: The main entry point of the React app, which uses **React Router** to manage routing between different views.
- **Room.js**: The main component that handles room joining and messaging. Users can join rooms, send messages, and view messages in real-time.
- **MessageBox.js**: Displays each individual message with differentiation between the current user's and other users' messages.
- **Navbar.js**: A simple navigation bar for app branding.

#### Key Functions:

1. **Join Room**: Prompts the user for their name and the room they want to join.
   ```js
   const joinRoom = (e) => {
     e.preventDefault();
     let userInput = prompt("Enter The Name:");
     socket.emit("join-room", { roomName, userInput });
     setYou(userInput);
   };
   ```

2. **Send Message**: Allows users to send messages to the server, which will then be broadcast to all users in the room.
   ```js
   const sendMessage = (e) => {
     e.preventDefault();
     const payload = {
       message,
       room: roomName,
       username: you,
     };
     socket.emit("message", payload);
     setMessage("");
   };
   ```

3. **Message Reception**: Listens for `received-message` events and updates the messages state.
   ```js
   socket.on("received-message", (data) => {
     setMessages((prev) => [...prev, data]);
   });
   ```



## Technologies Used

- **Node.js** for the backend.
- **Express** for routing and server management.
- **Socket.io** for real-time communication.
- **React.js** for the frontend.
- **Tailwind CSS** for styling the application.
- **Dotenv** for managing environment variables.


