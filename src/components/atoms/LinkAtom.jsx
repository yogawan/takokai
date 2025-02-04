import React from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkAtom = ({ to, text, className }) => (
  <div className={className}>
    <RouterLink to={to}>
      {text}
    </RouterLink>
  </div>
);

export default LinkAtom;