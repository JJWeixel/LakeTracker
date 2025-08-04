import React from "react";

interface WavePulseProps {
  periodSeconds: number; // dominant wave period in seconds
}

const WavePulse: React.FC<WavePulseProps> = ({ periodSeconds }) => {
  const duration = `${periodSeconds}s`;

return (
    <div className="relative w-[80px] h-[80px]">
        <div
            className="absolute w-full h-full rounded-full bg-blue-400 opacity-40 animate-pulse-wave"
            style={{ animationDuration: duration }}
        ></div>
        <div className="absolute w-[40px] h-[40px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"></div>
    </div>
);
};

export default WavePulse;
