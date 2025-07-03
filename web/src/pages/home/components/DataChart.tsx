"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import * as React from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartData = [
    { date: "2025-06-22", temp: 60, wind: 13, waves: 3 },
    { date: "2025-06-23", temp: 62, wind: 5, waves: .5 },
    { date: "2025-06-24", temp: 61, wind: 6, waves: 1 },
    { date: "2025-06-25", temp: 63, wind: 17, waves: 4 },
    { date: "2025-06-26", temp: 62, wind: 12, waves: 2 },
    { date: "2025-06-27", temp: 63, wind: 6, waves: 1 },
    { date: "2025-06-28", temp: 64, wind: 7, waves: 1 }
];

const chartConfig = {
    temp: {
        label: "Temp (°F)",
        color: "#33C1FF",
    },
    wind: {
        label: "Wind (mph)",
        color: "#bebebe",
    },
    waves: {
        label: "Waves (ft)",
        color: "#a295ff",
    }
} satisfies ChartConfig

const DataChart = () => {
    const [measurement, setMeasurement] = React.useState("temp")

    return (
        <Card className="w-7/8 h-auto text-5xl">
            <CardHeader>
                <CardTitle className="text-3xl">History</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        className="*:data-[slot=toggle-group-item]:!px-4"
                        value={measurement}
                        onValueChange={setMeasurement}
                    >
                        <ToggleGroupItem value="temp">Temperature</ToggleGroupItem>
                        <ToggleGroupItem value="wind">Wind speed</ToggleGroupItem>
                        <ToggleGroupItem value="waves">Wave height</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full aspect-auto"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id={`fill${measurement.charAt(0).toUpperCase() + measurement.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor={`var(--color-${measurement})`}
                                stopOpacity={1.0}
                                />
                                <stop
                                offset="95%"
                                stopColor={`var(--color-${measurement})`}
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            dataKey={measurement}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={30}
                            domain={
                                measurement === "temp" ? [30, 80] :
                                measurement === "wind" ? [0, 40] :
                                measurement === "waves" ? [0, 12] : [0, 'dataMax']
                            }
                            tickFormatter={(value) => {
                                return measurement === "temp" ? `${value}` :
                                       measurement === "wind" ? `${value}` :
                                       measurement === "waves" ? `${value}` : value;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    })
                                }}
                                indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey={measurement}
                            type="linear"
                            fill={`url(#fill${measurement.charAt(0).toUpperCase() + measurement.slice(1)})`}
                            stroke={`var(--color-${measurement})`}
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default DataChart;