import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";
import OpenSiteAtom from "../atoms/OpenSiteAtom";
import PointAtom from "../atoms/PointAtom";
import TagAtom from "../atoms/TagAtom";

const CardProjectsOrganism = ({ i }) => (
  <div className="min-w-[350px] max-w-[350px] h-fit flex-shrink-0 p-5 m-2 border border-black/15 dark:border-white/15 rounded-3xl">
    <div className="flex items-center justify-between">
      <ProtectedImageAtom
        src={i.image_url}
        alt="icon" className="w-16 rounded-full"
      />
      <TagAtom text={i.status} />
    </div>

    <p className="mt-5 mb-2 text-3xl font-normal text-black leading-none">{i.name}</p>
    <p className="mt-2 mb-2 font-normal text-black/65">{i.description}</p>



    {i.skills_used.map((i, index) => (
      <div key={index} className="flex p-3 border border-black/15 m-1 rounded-xl">
        <div>
          <ProtectedImageAtom src={i.skill_logo} alt="logo" className="w-5 rounded-full" />
        </div>
        <div className="ml-2">
          <p>{i.skill}</p>
        </div>
      </div>
    ))}

    {i.features.map((i, index) => (
      <PointAtom key={index} text={i} />
    ))}

    <div className="flex flex-wrap">
      {i.technologies.map((i, index) => (
        <div key={index} className="flex p-3 border border-black/15 m-1 rounded-xl w-fit">
          <div>
            <ProtectedImageAtom src={i.tech_stack_logo} alt="logo" className="w-5 rounded-full" />
          </div>
          <div className="ml-2">
            <p>{i.tech_stack}</p>
          </div>
        </div>
      ))}
    </div>
    <OpenSiteAtom href={i.demo_url} text="DEMO" className="px-5 py-4 border border-black/25 text-black w-full rounded-2xl text-center mt-5"></OpenSiteAtom>
    <OpenSiteAtom href={i.github_url} text="GitHub" className="px-5 py-5 bg-black text-white w-full rounded-2xl text-center mt-2"></OpenSiteAtom>
  </div>
);

export default CardProjectsOrganism;