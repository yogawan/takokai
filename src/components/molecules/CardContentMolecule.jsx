import React from "react";
import TextAtom from "../atoms/TextAtom";
import IconAtom from "../atoms/IconAtom";

const CardContentMolecule = ({ title, price, desc }) => (
  <div className="mt-5 mb-5">
    <TextAtom className="text-xl text-black/75 dark:text-white/75 font-normal mb-1">{title}</TextAtom>
    <TextAtom className="text-xs text-black/75 dark:text-white/75 font-normal mb-1">{desc}</TextAtom>
    <div className="flex flex-col">
      <div className="flex items-center">
        <IconAtom icon="material-symbols:loyalty" width="24" height="24" className="text-black/75 dark:text-white/75 mr-1"></IconAtom>
        <TextAtom className="text-xl font-normal text-black/75 dark:text-white/75">{price}</TextAtom>
      </div>
    </div>
  </div>
);

export default CardContentMolecule;