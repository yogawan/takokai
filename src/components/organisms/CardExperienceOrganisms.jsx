import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import TagAtom from "../atoms/TagAtom";
import PointAtom from "../atoms/PointAtom";

const CardExperienceOrganism = ({ i }) => (
  <div className="flex flex-col">
    <div className="w-full flex justify-start">
      <ProtectedImageAtom
        src={i.imageUrl}
        alt="icon" className="w-16 rounded-full"
      />
    </div>
    <div className="border border-black/25 mt-[-32px] mb-[32px]"></div>
    <div className="min-w-[350px] max-w-[350px] h-fit flex-shrink-0 p-2 m-2 border border-black/0 dark:border-white/15 rounded-3xl">
      <div className="flex items-center justify-start">
        <TagAtom
          text={i.date}
        ></TagAtom>
      </div>

      <p className="mt-5 mb-2 text-3xl font-normal text-black leading-none">{i.company}</p>
      <p className="mt-2 mb-7 text-xl font-normal text-black/75 leading-none">{i.role}</p>
      {i.jobdesk.map((i, index) => (
        <PointAtom key={index} text={i} />
      ))}
    </div>
  </div>
);

export default CardExperienceOrganism;