import React from "react";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom"

const CreatorOrganism = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black/15 backdrop-blur p-5">
      <div className="flex justify-center items-center">
          <div className="mr-5 border border-white/15 rounded-full flex">
            <a href="/" className="m-3">
              <ProtectedImageAtom src="./tech_stack/vitejs.svg" alt="icon" className="w-[16px]"></ProtectedImageAtom>
            </a>
            <a href="/" className="m-3">
              <ProtectedImageAtom src="./tech_stack/reactjs.svg" alt="icon" className="w-[16px]"></ProtectedImageAtom>
            </a>
            <a href="/" className="m-3">
              <ProtectedImageAtom src="./tech_stack/tailwindcss.svg" alt="icon" className="w-[16px]"></ProtectedImageAtom>
            </a>
          </div>
          {/* <div>
            <ProtectedImageAtom src="./assets/created_by_yogaone.svg" alt="logo" className="w-[128px] xl:w-[256px]"></ProtectedImageAtom>
          </div> */}
      </div>
    </div>
  )
};

export default CreatorOrganism;
