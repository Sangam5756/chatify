import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/Room";
import Body from "./components/Body";
import { ToastContainer, toast } from "react-toastify";

setInterval(() => {
  fetch("https://ai-coder-cogm.onrender.com/get-tasks")
    .then((res) => console.log("called"))
    .catch((err) => console.log(err));
},600000);

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
