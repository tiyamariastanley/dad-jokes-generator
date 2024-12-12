import React from "react";
import logo from "../../assets/logo.png";
import Filters from "./Filters";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className="h-[95vh] w-[18%] bg-white rounded-xl border border-r-gray-300">
      <img src={logo} className="mt-5"></img>
      <Filters></Filters>
    </div>
  );
};

export default NavBar;
