import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import WavePulse from "./WavePulse";
import { Separator } from "@/components/ui/separator";
import useWaves from "@/hooks/useWaves";
import { mToFt } from "@/utility/convert";
import { useUnits } from "@/contexts/UnitsContext";
import { useStation } from "@/contexts/StationContext";

const WaveCard : React.FC = () => {
    
    const { stationId } = useStation();
    const { getCurrentWaves } = useWaves();
    const { data } = useQuery({
        queryKey: ["waves", "current", stationId],
        queryFn: () => getCurrentWaves(stationId)
    });
    const { heightUnits: unit } = useUnits();
    const currentWave = data?.[0];
    const waveHeight = unit === "meters" ? currentWave?.waveHeight : mToFt(currentWave?.waveHeight ?? 0);
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Waves</CardTitle>
                <CardDescription>height & frequency</CardDescription>
            </CardHeader>
            <CardContent className="h-full min-w-0">
                <div className="flex h-full flex-row items-center gap-4 px-4 lg:gap-8 lg:px-8">
                    <div className="shrink-0">
                        <WavePulse periodSeconds={currentWave?.dominantWavePeriod ?? 0} />
                    </div>
                    <div className="flex min-w-0 flex-grow justify-center">
                        <div className="flex min-w-0 flex-col items-center py-4 text-center text-lg md:text-3xl justify-start gap-3">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-base opacity-50 md:text-xl">Height</div>
                                <div>
                                    { waveHeight } { unit }
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-base opacity-50 md:text-xl">Dominant Wave Period</div>
                                <div>{ currentWave?.dominantWavePeriod } seconds</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WaveCard;