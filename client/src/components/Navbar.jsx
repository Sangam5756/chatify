import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div data-theme="dark" className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Chatify</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {/* <Link to={"/"}>Friend</Link> */}
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
