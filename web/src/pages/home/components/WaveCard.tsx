import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import WavePulse from "./WavePulse";
import { Separator } from "@/components/ui/separator";
import useWaves from "@/hooks/useWaves";
import { mToFt } from "@/utility/convert";
import { useUnits } from "@/contexts/UnitsContext";

const WaveCard : React.FC = () => {
    
    const { getWaves } = useWaves();
    const { data } = useQuery({
        queryKey: ["waves"],
        queryFn: getWaves
    });
    const { heightUnits: unit } = useUnits();
    const waveHeight = unit === "meters" ? data?.[0].waveHeight : mToFt(data?.[0].waveHeight ?? 0);
    
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
                    <div className="flex flex-col items-center py-4 text-3xl justify-start gap-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Height</div>
                            <div>
                                { waveHeight } { unit }
                            </div>
                        </div>
                        <Separator />
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Dominant Wave Period</div>
                            <div>{ data?.[0].dominantWavePeriod } seconds</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WaveCard;