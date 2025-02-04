import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import TagAtom from "../atoms/TagAtom";
import AccountListContentMolecule from "../molecules/CardAccountContentMolecule";
import OpenSiteAtom from "../atoms/OpenSiteAtom";

const CardAccountOrganism = ({ imageUrl, status, name, username, bio, buttonText, buttonLink }) => (
  <div className="min-w-[350px] max-w-[350px] h-fit flex-shrink-0 p-5 m-2 border border-black/15 dark:border-white/15 rounded-3xl">
    <div className="flex items-center justify-between">
      <ProtectedImageAtom
        src={imageUrl}
        alt="icon" className="w-16 rounded-2xl"
      ></ProtectedImageAtom>
      <TagAtom
        text={status}
      ></TagAtom>
    </div>

    <AccountListContentMolecule
      name={name}
      username={username}
      desc={bio}
    ></AccountListContentMolecule>

    {/* <PointAtom text="First"></PointAtom> */}

    <OpenSiteAtom
      href={buttonLink}
      text={buttonText}
      className="p-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-center"
    ></OpenSiteAtom>
  </div>
);

export default CardAccountOrganism;