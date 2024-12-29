import React from "react";

const MessageBox = ({ message, you }) => {
    

    const isUserMessage = message?.username === you;
    console.log("it is current user : ",isUserMessage)
    console.log(message)

    return (
      <div>
          {/* User's message */}
      {isUserMessage && (
        <div className="flex justify-start items-center my-4 lg:px-10">
              <strong className="text-sm text-gray-200">{you }: &nbsp; </strong>
          <div className="bg-green-500 text-white  rounded-lg  p-3 max-w-xs shadow-lg ">
            <div className="">
              <p className="text-lg">{message.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Other user's message */}
      {!isUserMessage && (
        <div className="flex justify-start items-center lg:px-10 my-4">
              <strong className="text-sm text-gray-300">{message.username}: &nbsp;</strong>
          <div className="bg-gray-700 text-white rounded-lg p-3 max-w-xs shadow-lg flex items-center">
            <div className="flex flex-col">
              <p className="text-lg">{message.message}</p>
            </div>
          </div>
        </div>
      )}
        
      </div>
    );
  };
export default MessageBox;
