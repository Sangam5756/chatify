import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { LocalbackendUrl, ProductionbackendUrl } from "../constant";
import Loading from "./Loading";

const Body = () => {
  const [loading, setLoading] = useState(false);


  return (
    <div>
      <div >
        {/* <Navbar/> */}
        {loading ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};

export default Body;
