import { ChevronDown } from "lucide-react";

export function Compass() {
    const tickMarks = Array.from({ length: 36 });
    
    return (
        <div className="h-auto w-[160px] flex flex-col items-center">
            <ChevronDown className="w-8 h-8"/>
            <div className="min-w-[160px] min-h-[160px] -rotate-45 border-[10px] rounded-full flex flex-col justify-center items-center relative text-xl">
                <div className="-translate-y-[55px] absolute text-red-500 font-bold">N</div>
                <div className="-translate-x-[55px] absolute font-bold">W</div>
                <div className="translate-y-[55px] absolute font-bold">S</div>
                <div className="translate-x-[55px] absolute font-bold">E</div>
                <div className="text-4xl rotate-45">NE</div>

                {tickMarks.map((_, i) => {
                    const rotateDeg = i * 11.25; // 360 / 32
                    const isMajor = i % 4 === 0; // Major ticks at N, E, S, W

                    return (
                        <div
                            key={i}
                            className={`absolute top-1/2 left-1/2 w-[2px] ${
                                isMajor ? "h-[10px]" : "h-[6px]"
                            } ${isMajor ? "bg-black dark:bg-white" : "bg-black dark:bg-white"} origin-top-left`}
                            style={{
                                transform: `rotate(${rotateDeg}deg) translateY(-80px)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    )
}