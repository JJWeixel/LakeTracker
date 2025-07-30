import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"
import Compass from "./Compass"
import useWind from "@/hooks/useWind";
import { useQuery } from "@tanstack/react-query";

const WindCard : React.FC = () => {

    const { getWindTemp } = useWind();
    const { data } = useQuery({
        queryKey: ["windTemp"],
        queryFn: getWindTemp
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
                    <div className="flex flex-col items-center py-4 justify-start text-4xl gap-4">
                        <div>{ data?.data[0].s } Knots</div>
                        <Separator />
                        <div className="flex flex-col justify-start items-center">
                            <div>{ data?.data[0].d }&deg;</div>
                            <div className="text-2xl opacity-50">{ windDirectionMap[data?.data[0].dr as keyof typeof windDirectionMap] || data?.data[0].dr }</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default WindCard;