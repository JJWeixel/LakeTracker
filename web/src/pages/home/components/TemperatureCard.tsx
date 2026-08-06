import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TemperatureSlider } from "@/components/ui/temperature-slider"
import useWeather, { type WeatherResponse } from "@/hooks/useWeather";
import { Separator } from "@radix-ui/react-separator"
import { useQuery } from "@tanstack/react-query";
import { fToC } from "@/utility/convert";
import { useUnits } from "@/contexts/UnitsContext";
import { useStation } from "@/contexts/StationContext";

const TemperatureCard : React.FC = () => {
    
    const { stationId } = useStation();
    const { getCurrentWeather, getWeather } = useWeather();
    const { data: currentWeatherData } = useQuery<WeatherResponse[]>({
        queryKey: ["weather", "current", stationId],
        queryFn: () => getCurrentWeather(stationId)
    });
    const { data: sevenDayWeather = [] } = useQuery<WeatherResponse[]>({
        queryKey: ["weather", stationId, 7],
        queryFn: () => getWeather(stationId, 7)
    });
    const currentWeather = currentWeatherData?.[0];
    const waterTemperature = currentWeather?.waterTemperature ?? 0;
    const { temperatureUnits: unit } = useUnits();
    const displayTemp = unit === "F" ? Math.round(waterTemperature) : fToC(waterTemperature);
    const sevenDayWaterTemps = sevenDayWeather
        .map((weather) => weather.waterTemperature)
        .filter((temperature): temperature is number => temperature !== null);
    const sevenDayHigh = sevenDayWaterTemps.length ? Math.max(...sevenDayWaterTemps) : 0;
    const sevenDayLow = sevenDayWaterTemps.length ? Math.min(...sevenDayWaterTemps) : 0;
    const displaySevenDayHigh = unit === "F" ? Math.round(sevenDayHigh) : fToC(sevenDayHigh);
    const displaySevenDayLow = unit === "F" ? Math.round(sevenDayLow) : fToC(sevenDayLow);

    return (
        <Card className="w-full min-w-0">
            <CardHeader>
                <CardTitle className="text-3xl">Water Temperature</CardTitle>
                <CardDescription>current conditions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-4 justify-between items-center px-8">
                    <div>{ displayTemp }&deg;{ unit }</div>
                    <div className="flex flex-col items-center text-gray-500">
                        <div className="text-base">Prev 7 Days</div>
                        <Separator />
                        <div className="w-full flex flex-row justify-between gap-4 items-center">
                            <div className="text-base">H: {displaySevenDayHigh}&deg;{unit}</div>
                            <div className="text-base">L: {displaySevenDayLow}&deg;{unit}</div>
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