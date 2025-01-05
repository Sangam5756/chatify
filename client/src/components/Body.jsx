import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { LocalbackendUrl, ProductionbackendUrl } from "../constant";
import Loading from "./Loading";

const Body = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const siteUp = async () => {
      setLoading(true);
      try {
        const res = await fetch(ProductionbackendUrl, {
          method: "GET",
        });

        const response = await res.json();
        if (response?.up) {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    siteUp();
  }, []);

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
