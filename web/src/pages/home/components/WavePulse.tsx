import React from "react";

interface WavePulseProps {
  periodSeconds: number; // dominant wave period in seconds
}

const WavePulse: React.FC<WavePulseProps> = ({ periodSeconds }) => {
  const duration = `${periodSeconds}s`;

return (
  <div className="relative h-[72px] w-[72px] md:h-[88px] md:w-[88px]">
    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-pulse-wave" style={{ animationDuration: duration }}></div>
    <div className="absolute left-1/2 top-1/2 h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"></div>
  </div>
);
};

export default WavePulse;
