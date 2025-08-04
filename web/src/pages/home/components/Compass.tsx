import useWeather from "@/hooks/useWeather";
import { useQuery } from "@tanstack/react-query";
import { MousePointer2 } from "lucide-react";

const Compass : React.FC = () => {
    
    const tickMarks = Array.from({ length: 36 });
    const { getWeather } = useWeather();
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: getWeather
    });

    return (
        <div className={`min-w-[160px] min-h-[160px] border-[10px] rounded-full flex flex-col justify-center items-center relative text-2xl`}>
            <div className="-translate-y-[55px] absolute text-red-500 font-bold">N</div>
            <div className="-translate-x-[55px] absolute font-bold">W</div>
            <div className="translate-y-[55px] absolute font-bold">S</div>
            <div className="translate-x-[55px] absolute font-bold">E</div>
            <MousePointer2 
                className="absolute size-10 fill-gray-300"
                style={{ transform: `rotate(${Math.round(data?.[0].windDirection ?? 0) + 45}deg)` }}
                color="#000000"
            />

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
    )
}

export default Compass