import React from "react";
import ProtectedImageAtom from "./ProtectedImageAtom";
import TextAtom from "./TextAtom";

const PointAtom = ({ text }) => (
    <div className="flex items-start m-2">
        <ProtectedImageAtom src={"./assets/point.png"} alt="point" className="w-5 mr-7"></ProtectedImageAtom>
        <TextAtom children={text} className="text-black/65"></TextAtom>
    </div>
);

export default PointAtom;