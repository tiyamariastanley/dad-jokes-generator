import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Filters from "./Filters";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div
      className={`${
        showNav ? "absolute w-[85%] z-30" : "w-10"
      } h-screen md:w-[18%] md:h-[95vh] bg-white md:rounded-xl border border-r-gray-300 transition-all duration-300`}
    >
      <img
        src={logo}
        className="mt-5"
        onClick={() => setShowNav((prev) => !prev)}
      ></img>
      <Filters showNav={showNav}></Filters>
    </div>
  );
};

export default NavBar;
