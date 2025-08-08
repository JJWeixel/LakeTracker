import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Compass from "./Compass"
import { useQuery } from "@tanstack/react-query";
import useWeather from "@/hooks/useWeather";
import { Separator } from "@/components/ui/separator";

const WindCard : React.FC = () => {

    const { getWeather } = useWeather();
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: getWeather
    });

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
                <CardTitle className="text-3xl">Wind</CardTitle>
                <CardDescription>direction & speed</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <div className="h-full flex flex-row gap-8 justify-between px-8 items-center">
                    <Compass />
                    <div className="flex flex-col items-center py-4 justify-start text-3xl gap-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Speed</div>
                            <div>{ data?.[0].windSpeed } Knots</div>
                        </div>
                        <Separator />
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Gusts</div>
                            <div>{ data?.[0].gustSpeed } Knots</div>
                        </div>
                        <Separator />
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-xl opacity-50">Direction</div>
                            <div className="flex flex-row justify-start items-baseline gap-2">
                                <div>{ data?.[0].windDirection }&deg;</div>
                                <div className="text-xl">{ windDirectionMap[data?.[0].windDirectionReadable as keyof typeof windDirectionMap] || data?.[0].windDirectionReadable }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WindCard;