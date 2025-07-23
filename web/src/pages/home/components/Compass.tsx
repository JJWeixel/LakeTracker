import useWind from "@/hooks/useWind";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

const Compass : React.FC = () => {
    
    const tickMarks = Array.from({ length: 36 });
    const { getWindTemp } = useWind();
    const { data } = useQuery({
        queryKey: ["windTemp"],
        queryFn: getWindTemp
    });

    return (
        <div className="h-auto w-[160px] flex flex-col items-center">
            <ChevronDown className="w-8 h-8"/>
            <div 
                className={`min-w-[160px] min-h-[160px] border-[10px] rounded-full flex flex-col justify-center items-center relative text-2xl`}
                style={{ transform: `rotate(${Math.round(data?.data[0]?.d ?? 0)}deg)` }}
            >
                <div className="-translate-y-[55px] absolute text-red-500 font-bold">N</div>
                <div className="-translate-x-[55px] absolute font-bold">W</div>
                <div className="translate-y-[55px] absolute font-bold">S</div>
                <div className="translate-x-[55px] absolute font-bold">E</div>
                <div className="absolute">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[32px] border-b-red-500" />
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[32px] border-t-gray-300" style={{ top: '20px' }} />
                </div>

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

export default Compass