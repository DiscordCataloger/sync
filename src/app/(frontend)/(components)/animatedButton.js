import React from "react";
import { FaTrash } from "react-icons/fa";
import "./AnimatedButton.css";

const AnimatedButton = () => {
  return (
    <div className="animated-button">
      <FaTrash className="icon" />
    </div>
  );
};

export default AnimatedButton;
