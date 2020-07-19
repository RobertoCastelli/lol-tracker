import React from "react";
import bg from "../images/bg.jpg";

const Header = () => {
  return (
    <div className="title">
      <h1>League Of Legends</h1>
      <img className="bg-image" src={bg} alt="bg" />
    </div>
  );
};

export default Header;
