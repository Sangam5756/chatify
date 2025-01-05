import React, { useEffect, useRef } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const MessageBox = ({ message, you }) => {
  const isUserMessage = message?.username === you;

  function getFirstLetter(name) {
    return name.charAt(0).toUpperCase();
  }
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Message copied to clipboard!"); // Optional: Add a notification.
    });
  };
  const username = getFirstLetter(message?.username);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  //   <button
  //   className="mt-2 mb-2 mx-auto text-xs text-green-900 bg-white px-2 flex py-1 rounded shadow hover:bg-gray-200"
  //   onClick={() => handleCopy(message.message)}
  //   title="Copy message"
  // >
  //   Copy
  // </button>
  return (
    <div className="flex">
      {/* User's message */}
      {isUserMessage && (
        <div>
          <div className="chat flex flex-col chat-start">
            <div className="chat-header items-center flex py-2">
              {/* avatar */}
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xl">{username}</span>
                </div>
              </div>
              {/* username */}
              <div className=" rounded ml-2 text-green-500  text-sm">
                {message.username}
              </div>
            </div>

            <div className="flex flex-col">
              <div className=" text-white rounded-lg p-3 shadow-md max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl overflow-x-auto">
                {/* {message.message} */}
                <pre className="text-sm sm:text-base md:text-lg">
                  <code className="break-words">{message.message}</code>
                </pre>
              </div>
            </div>

            <div className="chat-footer opacity-50">Seen</div>
          </div>
        </div>
      )}

      {/* Other user's message */}
      {!isUserMessage && (
        <div>
          <div className="chat flex flex-col chat-start">
            <div className="chat-header flex items-center py-2 w-full justify-between">
              
               {/* avatar */}
               <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xl">{username}</span>
                </div>
              </div>
              {/* username */}
              <div className=" rounded ml-2 text-green-500  text-sm">
                {message.username}
              </div>
              <div>
                <p
                  className="cursor-pointer ml-10"
                  onClick={() => handleCopy(message.message)}
                  title="Copy message"
                >
                  <ContentCopyIcon />
                </p>
              </div>
            </div>
          {/* Message section */}
            <div className="flex flex-col w-full ">
              <div className=" text-white rounded-lg p-3 shadow-md max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl overflow-x-auto">
                 
                {/* {message.message} */}
                <pre className="text-sm sm:text-base md:text-lg">
                  <code className="break-words">{message.message}</code>
                </pre>
              </div>
            </div>

            <div className="chat-footer text-sm opacity-50">Seen</div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageBox;
