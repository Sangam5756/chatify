import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { LocalbackendUrl, ProductionbackendUrl } from "../constant";
import MessageBox from "./MessageBox";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
const Room = () => {
  const socket = useMemo(() => io(ProductionbackendUrl), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array to store all messages
  const [you, setYou] = useState(); // Assuming 'you' is the current user
  //   to check user is joined or not
  const [inRoom, setInRoom] = useState(false);
  // name of the room
  const [roomName, setRoomName] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  // function to join the room
  const joinRoom = (e) => {
    e.preventDefault();
    let userInput = prompt("Enter The Name:");
    socket.emit("join-room", { roomName, userInput });
    setYou(userInput);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message,
      room: roomName,
      username: you,
    };
    console.log("send-message", payload);
    socket.emit("message", payload);
    setMessage("");
  };

  const leaveRoom = () => {
    socket.disconnect();
    setInRoom(false);
    window.location.reload();
    alert(`${you} left the room`);
  };

  const toggle = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkTheme(true);
    }
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      // setSocketId(socket.id);
    });
    // after joining receive the message
    socket.on("join-message", (data) => {
      setInRoom(data?.inRoom);

      toast.success(data.message);
      setRoomName(data?.name);
      console.log(data);
    });

    socket.on("received-message", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log("message from the server :", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div data-theme={darkTheme ? "dark" : "light"} className="duration-500">
      <Navbar toggle={toggle} theme={darkTheme} />
      {!inRoom && (
        <div
          data-theme={darkTheme ? "dark" : "light"}
          className="flex h-[93vh] lg:h-[93vh] duration-500 justify-center"
        >
          <div className="card bg-base-300 my-10 h-fit w-96 shadow-xl">
            <h1 className="text-center text-3xl font-bold">CHAT APP</h1>
            <div className="card-body">
              <form onSubmit={joinRoom}>
                <div className="flex flex-col gap-2 items-center">
                  <label className="text-xl" htmlFor="message">
                    {" "}
                    Join Room or Create Room
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input outline-none px-2 py-1 mt-2 mb-2 input-bordered input-primary w-full max-w-xs"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <button
                    className={`px-4 py-2 rounded-md ${
                      darkTheme
                        ? "hover:bg-blue-900 text-white bg-blue-800"
                        : "hover:bg-blue-900 text-white bg-blue-800"
                    }`}
                    onClick={joinRoom}
                  >
                    JOIN ROOM
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {inRoom && (
        <div
          data-theme={darkTheme ? "dark" : "light"}
          className="flex duration-500 h-[93vh] lg:h-[93vh] justify-center"
        >
          <div className="card bg-base-300  h-full w-full shadow-xl">
            <div className="flex gap-5 justify-center">
              {" "}
              <h1 className="text-center text-xl font-bold">
                room : <span className="text-3xl font-bold">{roomName}</span>
              </h1>
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
            <div className="card-body flex flex-col w-full items-center overflow-auto-y h-[75vh]">
              <div className="w-full  flex flex-col  lg:space-y-2 h-[90vh]   max-h-[90vh] overflow-y-auto">
                {/* Chat messages container */}
                {messages?.map((msg, idx) => (
                  <MessageBox
                    theme={darkTheme}
                    key={idx}
                    message={msg}
                    you={you}
                  />
                ))}
              </div>
              {/* Input and Send Button */}
              <form onSubmit={sendMessage} className="w-full px-4 mt-4">
                <div className="flex items-center gap-2">
                  <textarea
                    className="w-full resize-none rounded-md p-3 text-base border border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300"
                    placeholder="Type your message..."
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevent newline
                        sendMessage(e); // Send message
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className={`px-5 py-2 font-medium rounded-md transition duration-300 ${
                      darkTheme
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
