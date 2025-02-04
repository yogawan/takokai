import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProtectedImageAtom from "../atoms/ProtectedImageAtom";

import { useDispatch, useSelector } from "react-redux";
import { fetchFooterContent } from "../../redux/footer/footerSlice";

const FooterOrganism = () => {
  const dispatch = useDispatch();
  const { footers, status, error } = useSelector((state) => state.footer);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFooterContent());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center"><Icon icon="line-md:loading-twotone-loop" width="24" height="24" className="text-black" /></div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black pb-20">
      <footer className="bg-black text-black border border-white/15 pt-20 pb-1 xl:pb-20 ml-3 mr-3 rounded-3xl">
        <div className="w-full">
          <div className="flex flex-wrap justify-center xl:justify-center xl:pl-[128px] xl:pr-[128px]">
            {/* Logo */}
            <div className="w-[128px] xl:w-[256px] m-5">
              <ul>
                <ProtectedImageAtom src="/assets/logo.png" alt="image" className="w-40 rounded-xl" />
              </ul>
            </div>

            {/* Content */}
            {footers.map((section, index) => (
              <div key={index} className="w-full xl:w-[256px] p-7">
                <h1 className="text-xl font-light tracking-4p xl:tracking-4p text-white mb-4 leading-none">
                  {section.title}
                </h1>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="flex justify-between items-center pb-3 mb-3 border-b border-white/15 xl:border-none text-white/50 hover:text-white transition-colors">
                      <a className="text-xs" href={link.href}>
                        {link.label}
                      </a>
                      <Icon icon="mdi:code-tags" width="18" height="18" className="ml-3 text-white" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-black/15 pt-4 text-center text-sm">
            <p className="text-black/50">
              &copy; {new Date().getFullYear()} Your Name. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterOrganism;