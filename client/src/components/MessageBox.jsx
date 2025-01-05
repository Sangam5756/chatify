import React from "react";
import "./Message.css"
const MessageBox = ({ message, you }) => {
  const isUserMessage = message?.username === you;
  console.log("it is current user : ", isUserMessage);
  console.log(message);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!"); // Optional: Add a notification.
    });
  };

  return (
    <div>
      {/* User's message */}
      {isUserMessage && (
        <div className="message-container">
          <strong className="message-username">{you}: &nbsp;</strong>
          <div className="message-box user-message">
            <pre className="message-text">
              <code>{message.message}</code>
            </pre>
           
          </div>
           {/* Copy button */}
           <button
              className="copy-button"
              onClick={() => handleCopy(message.message)}
              title="Copy message"
            >
              copy
            </button>
        </div>
      )}

      {/* Other user's message */}
      {!isUserMessage && (
        <div className="message-container">
          <strong className="message-username">
            {message.username}: &nbsp;
          </strong>
          <div className="message-box other-message">
            <pre className="message-text">
              <code>{message.message}</code>
            </pre>
            {/* Copy button */}
            <button
              className="copy-button"
              onClick={() => handleCopy(message.message)}
              title="Copy message"
            >
              copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MessageBox;
