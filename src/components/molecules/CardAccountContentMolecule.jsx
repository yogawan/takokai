import React from "react";
import TextAtom from "../atoms/TextAtom";
import IconAtom from "../atoms/IconAtom";

const CardAccountContentMolecule = ({ name, username, desc }) => (
  <div className="mt-5 mb-5">
    <TextAtom className="text-xl text-black/75 dark:text-white/75 font-normal mb-5">{desc}</TextAtom>
    <div className="flex justify-between flex-wrap">
      <div className="flex items-center">
        <IconAtom icon="material-symbols:person" width="24" height="24" className="text-black/75 dark:text-white/75 mr-1"></IconAtom>
        <TextAtom className="text-xl font-normal text-black/75 dark:text-white/75">{name}</TextAtom>
      </div>
      <div className="flex items-center">
        <IconAtom icon="material-symbols:alternate-email-rounded" width="24" height="24" className="text-black/75 dark:text-white mr-1"></IconAtom>
        <TextAtom className="text-xl font-normal text-black/75 dark:text-white/75">{username}</TextAtom>
      </div>
    </div>
  </div>
);

export default CardAccountContentMolecule;