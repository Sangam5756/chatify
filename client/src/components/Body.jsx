import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
