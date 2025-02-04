import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import LinkAtom from "../atoms/LinkAtom";
import CardContentMolecule from "../molecules/CardContentMolecule";

const CardOrganism = ({ imageUrl, title, desc, price, buttonText, buttonLink }) => (
  <div className="min-w-[350px] max-w-[350px] h-fit flex-shrink-0 p-5 m-2 border border-black/15 dark:border-white/15 rounded-2xl">
    <div className="flex items-center justify-between">
      <ProtectedImageAtom
        src={imageUrl}
        alt="icon" className="w-full"
      ></ProtectedImageAtom>
    </div>

    <CardContentMolecule
      title={title}
      desc={desc}
      price={price}
    ></CardContentMolecule>

    <LinkAtom
      to={buttonLink}
      text={buttonText}
      className="p-5 bg-black text-white rounded-full text-center"
    ></LinkAtom>
  </div>
);

export default CardOrganism;