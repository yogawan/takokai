import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQContent } from "../../redux/faq/faqSlice";

const FAQOrganism = () => {
  const dispatch = useDispatch();
  const { faqs, status, error } = useSelector((state) => state.faq);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFAQContent());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center"><Icon icon="line-md:loading-twotone-loop" width="24" height="24"  className="text-black" /></div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-3 xl:pl-10 xl:pr-10 w-full">
        {faqs.map((item, index) => (
          <div key={index} className="border border-black/25 m-2 rounded-3xl">
            <div
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer flex items-center justify-between p-10"
            >
              <span className="font-normal text-2xl text-black">{item.q}</span>
              <Icon
                icon={openIndex === index ? "mdi:chevron-up" : "mdi:chevron-down"}
                className="text-xl text-black/75"
              />
            </div>
            <div
              className={`transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
              } overflow-hidden`}
            >
              <div className="p-4">
                <p className="text-black/75">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQOrganism;
