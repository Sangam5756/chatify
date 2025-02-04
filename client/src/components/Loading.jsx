import React, { useState, useEffect } from "react";

const Loading = () => {
  // State to track countdown value


  return (
    <div className="h-screen w-full flex duration-1000 flex-col items-center justify-center" data-theme="dark">
      <progress className="progress w-56" />
    </div>
  );
};

export default Loading;
