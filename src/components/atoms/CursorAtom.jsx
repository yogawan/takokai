import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [delayedPositions, setDelayedPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const intervals = delayedPositions.map((_, index) =>
      setInterval(() => {
        setDelayedPositions((prev) =>
          prev.map((pos, i) =>
            i === index
              ? {
                  x: pos.x + (cursorPosition.x - pos.x) * (0.1 - i * 0.03),
                  y: pos.y + (cursorPosition.y - pos.y) * (0.1 - i * 0.03),
                }
              : pos
          )
        );
      }, 16)
    );
    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [cursorPosition]);

  return (
    <>
      {delayedPositions.map((pos, index) => (
        <div
          key={index}
          className={`z-50 lg:fixed ${
            index === 0
              ? "w-8 h-8 bg-[#000000]"
              : index === 1
              ? "w-6 h-6 bg-[#171717]"
              : "w-4 h-4 bg-[#303030]"
          } rounded-full pointer-events-none`}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            transition: "transform 0.1s linear",
            zIndex: 50 - index,
          }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;