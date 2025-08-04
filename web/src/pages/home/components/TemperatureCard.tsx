import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TemperatureSlider } from "@/components/ui/temperature-slider"
import useWeather from "@/hooks/useWeather";
import { Separator } from "@radix-ui/react-separator"
import { useQuery } from "@tanstack/react-query";

const TemperatureCard : React.FC = () => {
    
    const { getWeather } = useWeather();
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: getWeather
    });

    return (
        <Card className="w-7/8">
            <CardHeader>
                <CardTitle className="text-3xl">Water Temperature</CardTitle>
                <CardDescription>current conditions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4 justify-between items-center px-8">
                    <div>{ Math.round(data?.[0].waterTemperature ?? 0) }&deg;F</div>
                    <div className="flex flex-col items-center text-gray-500">
                        <div className="text-base">Prev 7 Days</div>
                        <Separator />
                        <div className="w-full flex flex-row justify-between gap-4 items-center">
                            <div className="text-base">H: 54&deg;F</div>
                            <div className="text-base">L: 50&deg;F</div>
                        </div>
                    </div>
                    <TemperatureSlider 
                        defaultValue={[77]}
                        className="w-2/3 z-0"
                        min={25}
                        max={85}
                        disabled
                    />
                </div>
                </CardContent>
        </Card>
    )
}

export default TemperatureCard;