import React from "react";

const ButtonAtom = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`focus:outline-none ${className}`}>
    {children}
  </button>
);

export default ButtonAtom;