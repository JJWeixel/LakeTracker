import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Compass from "./Compass"
import { useQuery } from "@tanstack/react-query";
import useWeather from "@/hooks/useWeather";
import { Separator } from "@/components/ui/separator";
import { kToMS } from "@/utility/convert";
import { kToMph } from "@/utility/convert";
import { useUnits } from "@/contexts/UnitsContext";
import { useStation } from "@/contexts/StationContext";

const WindCard : React.FC = () => {

    const { stationId } = useStation();
    const { getCurrentWeather } = useWeather();
    const { data } = useQuery({
        queryKey: ["weather", "current", stationId],
        queryFn: () => getCurrentWeather(stationId)
    });
    const { windUnits: unit } = useUnits();
    const currentWeather = data?.[0];
    const windSpeed = unit === "knots" ? Number(currentWeather?.windSpeed ?? 0).toFixed(1) : unit === "mph" ? kToMph(currentWeather?.windSpeed ?? 0) : kToMS(currentWeather?.windSpeed ?? 0);
    const gustSpeed = unit === "knots" ? Number(currentWeather?.gustSpeed ?? 0).toFixed(1) : unit === "mph" ? kToMph(currentWeather?.gustSpeed ?? 0) : kToMS(currentWeather?.gustSpeed ?? 0);

    const windDirectionMap: { [key: string]: string } = {
        N: "North",
        S: "South",
        E: "East",
        W: "West",
        NW: "Northwest",
        NE: "Northeast",
        SW: "Southwest",
        SE: "Southeast",
        WNW: "West-Northwest",
        NNW: "North-Northwest",
        ENE: "East-Northeast",
        NNE: "North-Northeast",
        WSW: "West-Southwest",
        SSW: "South-Southwest",
        ESE: "East-Southeast",
        SSE: "South-Southeast"
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Wind</CardTitle>
                <CardDescription>direction & speed</CardDescription>
            </CardHeader>
            <CardContent className="h-full min-w-0">
                <div className="h-full flex flex-row gap-4 px-4 items-center justify-between lg:gap-8 lg:px-8">
                    <Compass />
                    <div className="flex min-w-0 flex-row flex-grow justify-center">
                        <div className="flex min-w-0 flex-col items-center py-4 justify-start text-center text-2xl md:text-3xl gap-3">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-xl opacity-50 md:text-xl">Speed</div>
                                <div>{ windSpeed } { unit }</div>
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-xl opacity-50 md:text-xl">Gusts</div>
                                <div>{ gustSpeed } { unit }</div>
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-xl opacity-50 md:text-xl">Direction</div>
                                <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:gap-2">
                                    <div>{ currentWeather?.windDirection }&deg;</div>
                                    <div className="text-sm md:text-base">{ windDirectionMap[currentWeather?.windDirectionReadable as keyof typeof windDirectionMap] || currentWeather?.windDirectionReadable }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WindCard;