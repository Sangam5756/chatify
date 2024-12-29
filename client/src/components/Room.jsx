import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { LocalbackendUrl, ProductionbackendUrl } from "../constant";
import MessageBox from "./MessageBox";
const Room = () => {
  const socket = useMemo(() => io(ProductionbackendUrl), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array to store all messages
  const [you, setYou] = useState(); // Assuming 'you' is the current user
//   to check user is joined or not
  const [inRoom, setInRoom] = useState(false);
  // name of the room
  const [roomName, setRoomName] = useState("");

  // function to join the room
  const joinRoom = (e) => {
    e.preventDefault();
    let userInput = prompt("Enter The Name:");
    socket.emit("join-room", { roomName, userInput });
    setYou(userInput)
  };



  const sendMessage = (e) => {
    e.preventDefault();
    const payload = {
      message,
      room: roomName,
      username: you,
    };
    console.log("send-message",payload)
    socket.emit("message", payload);
    setMessage("");
  };

  const leaveRoom = ()=>{
    socket.disconnect();
    setInRoom
    alert(`${you} leave the room`)
  }


  useEffect(() => {
    socket.on("connect", () => {
      // setSocketId(socket.id);
    });
    // after joining receive the message
    socket.on("join-message", (data) => {
      setInRoom(data?.inRoom);
      alert(data.message);
      setRoomName(data?.name);
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
    <div data-theme="dark" >
      {!inRoom && (
        <div  className="flex h-[93vh] lg:h-[93vh]  justify-center">
          <div className="card bg-base-300 my-10 h-fit w-96 shadow-xl">
            <h1 className="text-center text-3xl font-bold">CHAT APP</h1>
            <div className="card-body">
              <form onSubmit={joinRoom}>
              <div className="flex flex-col gap-2 items-center">
                <label className="text-xl" htmlFor="message">
                  {" "}
                  Join Room{" "}
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input outline-none px-2 py-1 mt-2 mb-2 input-bordered input-primary w-full max-w-xs"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <button
                  className="px-2 py-2 rounded-md hover:bg-blue-900 bg-blue-800"
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
        <div  className="flex  h-[93vh] lg:h-[93vh] justify-center">
          <div className="card bg-base-300  h-full w-full shadow-xl">
            <h1 className="text-center text-xl font-bold">
              room : <span className="text-3xl font-bold">{roomName}</span>
            </h1>
            <div className="card-body flex flex-col items-center overflow-auto-y h-[75vh]">
              <div className="w-full flex flex-col  lg:space-y-2 h-[90vh]   max-h-[90vh] overflow-y-auto">
                {/* Chat messages container */}
                {messages?.map((msg, idx) => (
                  <MessageBox  key={idx} message={msg} you={you} />
                ))}
              </div>
              {/* Input and Send Button */}
              <form onSubmit={sendMessage}>
                <div className="flex justify-center gap-2 items-center w-full mt-4">
                  <label className="text-xl" htmlFor="message"></label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input outline-none px-2 py-1 mt-2 mb-2 input-bordered input-primary w-full max-w-xs"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="px-4 py-2 rounded-md hover:bg-blue-900 bg-blue-800">
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
