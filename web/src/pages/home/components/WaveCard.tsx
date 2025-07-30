import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import useWaves from "@/hooks/useWaves";
import { useQuery } from "@tanstack/react-query";

const WaveCard : React.FC = () => {
    const { getWaveData } = useWaves();
    const { data } = useQuery({
        queryKey: ["waves"],
        queryFn: getWaveData
    });
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-3xl">Waves</CardTitle>
                <CardDescription>height</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <div className="h-full flex flex-row gap-8 justify-between px-8 items-center">
                    <div className="text-3xl">Design Element</div>
                    <div className="flex flex-col items-center py-4 text-4xl justify-start gap-4">
                        <div>
                            { data?.find(d => typeof d.WVHT === "number")?.WVHT != null
                            ? Math.floor(3.28084 * (data.find(d => typeof d.WVHT === "number")!.WVHT!) * 100) / 100
                            : null } feet
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WaveCard;