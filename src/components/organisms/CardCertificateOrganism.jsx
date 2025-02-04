import React from "react";

const CardCertificateOrganism = ({ certificate, onClick }) => {
  return (
    <div
      className="min-w-[400px] max-w-[400px] h-fit flex-shrink-0 m-2 border border-black/15 rounded-2xl"
      onClick={onClick}
    >
      <img
        src={certificate.image}
        alt={certificate.type}
        className="w-full rounded-2xl object-cover"
      />
      <div className="p-4">
        <h3 className="text-5xl leading-none font-thin mb-2 text-black dark:text-white font-inter">{certificate.platform}</h3>
        <hr className="border-b border-black/5 dark:border-white/15 mt-1 mb-5" />
        
        <p className="text-[16px] text-black/50 dark:text-white/50 font-inter flex items-center m-2">
          {certificate.publish_date} <p className="text-xs p-1 ml-3 border border-black/15 rounded-full">Publised Date</p>
        </p>
        <p className="text-[12px] text-black/50 dark:text-white/50 font-inter items-center m-2 flex flex-wrap">
          {certificate.credential_id} <p className="text-xs p-1 ml-3 border border-black/15 rounded-full">Credential ID</p>
        </p>
        <p className="mt-3 text-white bg-black p-5 text-center rounded-2xl">Click Anywhere to See Details</p>
      </div>
    </div>
  );
};

export default CardCertificateOrganism;
