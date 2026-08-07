"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import * as React from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useStation } from "@/contexts/StationContext";
import useWeather, { type WeatherResponse } from "@/hooks/useWeather";
import useWaves, { type WavesResponse } from "@/hooks/useWaves";
import { useUnits } from "@/contexts/UnitsContext";
import { fToC, kToMph, kToMS, mToFt } from "@/utility/convert";

type Measurement = "temp" | "wind" | "waves"

type ChartPoint = {
    date: string;
    temp: number | null;
    wind: number | null;
    waves: number | null;
}

const DataChart = () => {
    const { stationId } = useStation();
    const { temperatureUnits, windUnits, heightUnits } = useUnits();
    const { getWeather } = useWeather();
    const { getWaves } = useWaves();
    const [measurement, setMeasurement] = React.useState<Measurement>("temp")

    const { data: weatherData } = useQuery<WeatherResponse[]>({
        queryKey: ["weather", "history", stationId, 7],
        queryFn: () => getWeather(stationId, 7),
    });

    const { data: wavesData } = useQuery<WavesResponse[]>({
        queryKey: ["waves", "history", stationId, 7],
        queryFn: () => getWaves(stationId, 7),
    });

    const chartConfig = React.useMemo<ChartConfig>(() => ({
        temp: {
            label: `Temperature (${temperatureUnits === "F" ? "°F" : "°C"})`,
            color: "#33C1FF",
        },
        wind: {
            label: `Wind (${windUnits})`,
            color: "#bebebe",
        },
        waves: {
            label: `Waves (${heightUnits === "feet" ? "ft" : "m"})`,
            color: "#a295ff",
        },
    }), [temperatureUnits, windUnits, heightUnits]);

    const chartData = React.useMemo<ChartPoint[]>(() => {
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - index));
            return date.toISOString().slice(0, 10);
        });

        const weatherByDay = new Map<string, WeatherResponse>();
        const wavesByDay = new Map<string, WavesResponse>();

        for (const record of weatherData ?? []) {
            const day = record.time.slice(0, 10);
            if (!weatherByDay.has(day)) {
                weatherByDay.set(day, record);
            }
        }

        for (const record of wavesData ?? []) {
            const day = record.time.slice(0, 10);
            if (!wavesByDay.has(day)) {
                wavesByDay.set(day, record);
            }
        }

        return dates.map((date) => {
            const weather = weatherByDay.get(date);
            const waves = wavesByDay.get(date);

            return {
                date,
                temp: weather?.airTemperature ?? null,
                wind: weather?.windSpeed ?? null,
                waves: waves?.waveHeight ?? null,
            };
        });
    }, [weatherData, wavesData]);

    const chartValue = React.useMemo(() => {
        return chartData.map((point) => {
            const temp = point.temp == null ? null : temperatureUnits === "F" ? point.temp : fToC(point.temp);
            const wind = point.wind == null ? null : windUnits === "knots" ? Number(point.wind.toFixed(1)) : windUnits === "mph" ? kToMph(point.wind) : kToMS(point.wind);
            const waves = point.waves == null ? null : heightUnits === "feet" ? mToFt(point.waves) : point.waves;

            return {
                ...point,
                temp,
                wind,
                waves,
            };
        });
    }, [chartData, temperatureUnits, windUnits, heightUnits]);

    const axisRange = React.useMemo(() => {
        const values = chartValue
            .map((point) => point[measurement])
            .filter((value): value is number => typeof value === "number");

        if (!values.length) {
            return [0, 1] as [number, number];
        }

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const spread = maxValue - minValue;
        const padding = spread === 0 ? Math.max(Math.abs(maxValue) * 0.1, 1) : spread * 0.15;
        const lowerBound = Math.max(0, minValue - padding);
        const upperBound = maxValue + padding;

        return [lowerBound, upperBound] as [number, number];
    }, [chartValue, measurement]);

    return (
        <Card className="w-full min-w-0 h-auto text-5xl">
            <CardHeader>
                <CardTitle className="text-3xl">History</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
                <CardAction>
                    <Select value={measurement} onValueChange={(value) => setMeasurement(value as Measurement)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select series" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="temp">Temperature</SelectItem>
                            <SelectItem value="wind">Wind speed</SelectItem>
                            <SelectItem value="waves">Wave height</SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full aspect-auto"
                >
                    <AreaChart data={chartValue}>
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
                                const date = new Date(`${value}T00:00:00Z`)
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
                            tick={false}
                            width={0}
                            tickMargin={8}
                            minTickGap={30}
                            domain={axisRange}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                labelFormatter={(value) => {
                                    return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
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
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default DataChart;