import React, { useState } from "react";
import { Link } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const Navbar = ({theme,toggle}) => {

  

  return (
    <div  data-theme={theme? "dark":"light"}   className="navbar duration-500 bg-base-100">
      <div className="flex-1">
        <a className={`btn ${theme && "text-white"} btn-ghost text-xl`}>Chatify</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {/* {JSON.stringify(users)} */}
          <li>
            <i className="transition-all duration-500" onClick={toggle}>{theme ? <p title="Light-mode"><LightModeIcon/></p>:<p title="DarkMode"><DarkModeIcon/></p>}</i>
          </li>
          <li>
            {/* <Link to={"/room"}>Join Room</Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
