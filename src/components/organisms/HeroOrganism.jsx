import React from "react";
import HeroContentMolecule from "../molecules/HeroContentMolecule";
import TagAtom from "../atoms/TagAtom";
import LinkAtom from "../atoms/LinkAtom";
import OpenSiteAtom from "../atoms/OpenSiteAtom";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

const HeroOrganism = ({ tag, headline, subHeadline, buttonText, buttonLink, href, buttonTextSite }) => (
  <div className="flex justify-center m-5">
      <div className="flex flex-col justify-center items-center w-full xl:w-[720px] text-black dark:text-white">
        <TagAtom text={tag}></TagAtom>
        {/* <HeroContentMolecule 
            headline={headline}
            subHeadline={subHeadline}
        ></HeroContentMolecule> */}
        <ProtectedImageAtom src="./assets/hero_image.svg" alt="hero_image" className="w-full mt-4 mb-2"></ProtectedImageAtom>
        <div className="flex mt-3">
          <OpenSiteAtom href={buttonLink} text={buttonText} className="font-inter p-5 m-1 bg-black dark:bg-white text-white dark:text-black rounded-2xl"></OpenSiteAtom>
          <OpenSiteAtom href={href} text={buttonTextSite} className="font-inter p-5 m-1 border border-black/15 dark:border-white/15 text-black dark:text-white rounded-2xl"></OpenSiteAtom>
        </div>
      </div>
  </div>
);

export default HeroOrganism;