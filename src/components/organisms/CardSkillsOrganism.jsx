import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import OpenSiteAtom from "../atoms/OpenSiteAtom";
import PointAtom from "../atoms/PointAtom";
import TagAtom from "../atoms/TagAtom";

const CardSkillsOrganism = ({ i }) => (
  <div className="min-w-[350px] max-w-[350px] h-fit flex-shrink-0 p-5 m-2 border border-black/15 dark:border-white/15 rounded-3xl">
    <div className="flex items-center justify-between">
      <ProtectedImageAtom
        src={i.image_url}
        alt="icon" className="w-16 rounded-full"
      ></ProtectedImageAtom>
      <TagAtom
        text={i.long}
      ></TagAtom>
    </div>

    <p className="mt-5 mb-2 text-3xl font-normal text-black leading-none">{i.role}</p>
    {i.company_histori.map((i, index) => (
      <div key={index} className="flex p-3 border border-black/15 m-1 rounded-xl">
        <div>
          <ProtectedImageAtom src={i.image_url} alt="logo" className="w-5 rounded-full" />
        </div>
        <div className="ml-2">
          <p>{i.company}</p>
          <p>{i.long}</p>
        </div>
      </div>
    ))}

    {i.jobdesk.map((i, index) => (
      <PointAtom key={index} text={i} />
    ))}

    <OpenSiteAtom href={i.button_link} text={i.button_text} className="p-5 bg-black text-white w-full rounded-2xl mt-5 text-center"></OpenSiteAtom>
  </div>
);

export default CardSkillsOrganism;