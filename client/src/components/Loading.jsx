import React, { useState, useEffect } from "react";

const Loading = () => {
  // State to track countdown value
  const [counter, setCounter] = useState(45);

  // Decrease the counter every second
  useEffect(() => {
    
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full flex duration-1000 flex-col items-center justify-center" data-theme="dark">
      <div className="duration-1000 text-center">
        <span className="countdown font-mono text-4xl">
          <span
            style={{ "--value": counter }} // DaisyUI countdown requires this style for the value
            className="countdown-number"
          />
        </span>
        <p>Site is Down it will be up within time,have patience</p>
      </div>
      <progress className="progress w-56" />
    </div>
  );
};

export default Loading;
