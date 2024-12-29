io -> entire circuit
socket => specific client

- every socket has id which is unique
- emit use to emmit the message from client to server vise versa server to client
- if i emit(event1) then by on(event1) i will catch that emitted data.

emit |
socket.emmit(ev1) | socket.io(ev1) => understand i emited on that ev1 that can be any name
socket.on(ev2) | socket.emmit(ev1) => understand i emited on that ev1 that can be any name

# socket.broadcast.emmit()

- msg will go to all except one who sent
- is a method that allows a server to send a message to all clients except the one that initiated the event. This is useful when you want to broadcast something to everyone, but exclude the sender from receiving the message.

# io.emit() - send to all including the user who send the message
Sure! Below is a suggested README file for your messaging platform, including descriptions of the key features and functions you may want to add:

---
