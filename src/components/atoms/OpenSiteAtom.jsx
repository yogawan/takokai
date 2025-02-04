import React from "react";

const OpenSiteAtom = ({ href, text, className }) => (
    <div className={className}>
        <a href={href}>{text}</a>
    </div>
);

export default OpenSiteAtom;