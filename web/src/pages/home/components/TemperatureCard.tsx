import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TemperatureSlider } from "@/components/ui/temperature-slider"
import useWeather, { type WeatherResponse } from "@/hooks/useWeather";
import { useQuery } from "@tanstack/react-query";
import { fToC } from "@/utility/convert";
import { useUnits } from "@/contexts/UnitsContext";
import { useStation } from "@/contexts/StationContext";

const TemperatureCard : React.FC = () => {
    
    const { stationId } = useStation();
    const { getCurrentWeather } = useWeather();
    const { data: currentWeatherData } = useQuery<WeatherResponse[]>({
        queryKey: ["weather", "current", stationId],
        queryFn: () => getCurrentWeather(stationId)
    });
    const currentWeather = currentWeatherData?.[0];
    const waterTemperature = currentWeather?.waterTemperature ?? 0;
    const { temperatureUnits: unit } = useUnits();
    const displayTemp = unit === "F" ? Math.round(waterTemperature) : fToC(waterTemperature);

    return (
        <Card className="w-full min-w-0">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Water Temperature</CardTitle>
                <CardDescription>current conditions</CardDescription>
            </CardHeader>
            <CardContent className="min-w-0">
                <div className="flex flex-col gap-4 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="text-center text-6xl md:text-4xl lg:text-left">
                        { displayTemp }&deg;{ unit }
                    </div>
                    <TemperatureSlider 
                        defaultValue={[77]}
                        className="w-full min-w-0 lg:w-2/3 z-0"
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