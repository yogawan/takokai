import React from "react";

const ModalContentMolecule = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-3xl overflow-hidden max-w-3xl">
        <button
          className="absolute text-xl px-10 py-5 border border-black/15 top-2 right-2 text-black/50 rounded-full"
          onClick={onClose}
        >
          Close
        </button>
        <img
          src={image}
          alt="Certificate"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ModalContentMolecule;
