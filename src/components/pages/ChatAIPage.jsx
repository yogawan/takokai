import React from "react";
import JawirAIOrganism from "../organisms/JawirAIOrganism";
import FooterOrganism from "../organisms/FooterOrganism";
import CreatorOrganism from "../organisms/CreatorOrganism";

const ChatAIPage = () => {
    return (
        <div className="bg-[url('./assets/bg.png')] bg-cover bg-center h-screen">
            {/* <CreatorOrganism /> */}
            <JawirAIOrganism />
            {/* <FooterOrganism /> */}
        </div>
    )
};

export default ChatAIPage;
