import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./components/Room";
import Body from "./components/Body";

const App = () => {
  return (
    <div>
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
