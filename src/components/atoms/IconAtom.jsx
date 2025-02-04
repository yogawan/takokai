import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const IconAtom = ({ icon, width, height, className }) => (
    <Icon icon={icon} width={width} height={height} className={className} />
);

export default IconAtom;