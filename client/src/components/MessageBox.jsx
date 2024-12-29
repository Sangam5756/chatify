import React from "react";

const MessageBox = ({ message, you }) => {
    console.log(message)
    console.log("receiver",message.username)
    console.log("sender",you)

    const isUserMessage = message?.username === you;

    return (
      <div>
        
          <div className="flex justify-end my-5">
            <div className="bg-green-600 text-white rounded-lg p-2 max-w-xs">
              <strong>{you?.name}</strong> {message.message}
            </div>
          </div>
      </div>
    );
  };
export default MessageBox;
