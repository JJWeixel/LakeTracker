import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import useWeather from "@/hooks/useWeather";
import { useQuery } from "@tanstack/react-query";
import WavePulse from "./WavePulse";

const WaveCard : React.FC = () => {
    
    const { getWeather } = useWeather();
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: getWeather
    });
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-3xl">Waves</CardTitle>
                <CardDescription>height & frequency</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <div className="h-full flex flex-row gap-8 justify-between px-8 items-center">
                    <div className="pl-8">
                        <WavePulse periodSeconds={data?.[0].dominantWavePeriod ?? 0} />
                    </div>
                    <div className="flex flex-col items-center py-4 text-4xl justify-start gap-4">
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                { data?.[0].waveHeight != null 
                                    ? Math.floor(3.28084 * (data[0].waveHeight) * 100) / 100 
                                    : null } feet
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Dominant Wave Period</div>
                            <div>{ data?.[0].dominantWavePeriod } sec</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WaveCard;