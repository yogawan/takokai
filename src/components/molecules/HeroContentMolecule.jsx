import React from "react";
import TextAtom from "../atoms/TextAtom";

const HeroContentMolecule = ({ headline, subHeadline }) => (
  <div className="text-center">
    <TextAtom className="text-6xl font-inter font-medium mb-5 mt-2 leading-[80%]">{headline}</TextAtom>
    <TextAtom className="text-xs font-inter font-normal">{subHeadline}</TextAtom>
  </div>
);

export default HeroContentMolecule;