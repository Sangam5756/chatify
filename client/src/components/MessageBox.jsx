import React, { useEffect, useRef } from "react";

const MessageBox = ({ message, you }) => {
  const isUserMessage = message?.username === you;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!"); // Optional: Add a notification.
    });
  };
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="flex">
      {/* User's message */}
      {isUserMessage && (
        <div className="flex justify-end items-start my-2 px-4 lg:px-10">
          <strong className="text-sm sm:text-base text-gray-300">
            {message.username}: &nbsp;
          </strong>
          <div className="flex items-start justify-between w-full">
            {/* Message Box */}
            <div className="bg-green-800 text-white rounded-lg p-3 shadow-md max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl overflow-x-auto">
              <pre className="text-sm sm:text-base md:text-lg">
                <code className="break-words">{message.message}</code>
              </pre>
            </div>

            {/* Copy Button */}
            <button
              className="mt-2 text-xs text-green-900 bg-white px-2 py-1 rounded shadow hover:bg-gray-200"
              onClick={() => handleCopy(message.message)}
              title="Copy message"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Other user's message */}
      {!isUserMessage && (
        <div className="flex justify-end items-start my-2 px-4 lg:px-10">
        <strong className="text-sm sm:text-base text-gray-300">
          {message.username}: &nbsp;
        </strong>
        <div className="flex items-start justify-between w-full">
          {/* Message Box */}
          <div className="bg-gray-800 text-white rounded-lg p-3 shadow-md max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl overflow-x-auto">
            <pre className="text-sm sm:text-base md:text-lg">
              <code className="break-words">{message.message}</code>
            </pre>
          </div>

          {/* Copy Button */}
          <button
            className="mt-2 text-xs text-green-900 bg-white px-2 py-1 rounded shadow hover:bg-gray-200"
            onClick={() => handleCopy(message.message)}
            title="Copy message"
          >
            Copy
          </button>
        </div>
      </div>
      )}
       <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageBox;
