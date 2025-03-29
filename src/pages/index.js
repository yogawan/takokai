import AssistantAI from "@/components/AssistantAI";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>JawirAI</title>
      </Head>
      <Sidebar/>
      <div className="bg-black pb-[1080px] pt-[128px] flex justify-center">
        <div className="p-3 w-full xs:w-[390px] sm:w-[610px]">
          <AssistantAI />
        </div>
      </div>
    </>
  );
}

export default HomePage;