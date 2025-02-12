import React from "react";
import NavbarOrganism from "../organisms/NavbarOrganism";
import JawirAIOrganism from "../organisms/JawirAIOrganism";

const ChatAIPage = () => {
    return (
        <div className="bg-[url('/assets/bg.png')] bg-cover bg-center h-screen">
            <JawirAIOrganism />
            <NavbarOrganism></NavbarOrganism>
        </div>
    );
};

export default ChatAIPage;
