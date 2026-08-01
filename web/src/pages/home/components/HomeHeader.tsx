import { ChevronsUpDown, Waves, Check } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect } from "react"
import useStations from "@/hooks/useStations"
import type { StationResponse } from "@/hooks/useStations"
import { useStation } from "@/contexts/StationContext"

const HomeHeader = () => {
    const [open, setOpen] = React.useState(false)
    const { stationId, setStationId } = useStation()
    const { getStations } = useStations()

    const { data: stations = [] } = useQuery<StationResponse[]>({
        queryKey: ["stations"],
        queryFn: getStations,
    })

    useEffect(() => {
        if (stations.length > 0 && !stations.some((station) => station.id === stationId)) {
            setStationId(stations[0].id)
        }
    }, [stations, stationId, setStationId])

    const location = stations.find((station) => station.id === stationId)

    return (
        <div className="z-[1001] gap-8 sticky flex flex-row top-4 left-0 right-0 mx-auto h-24 w-5/6 items-center rounded-2xl px-8 p border bg-card/50 backdrop-blur-xl drop-shadow-sm">
            <Waves className="size-14 overflow-hidden" />
            <span className="text-5xl font-semibold">LakeTracker</span>
            <div className="flex flex-col justify-around items-start text-sm">
                <span className="overflow-hidden line-clamp-1">Tracking conditions on Lake Erie</span>
                <span className="overflow-hidden line-clamp-1">Made by JJ Weixel</span>
            </div>
            <div className="flex justify-end items-center grow">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline"
                            role="combobox"
                            aria-expanded={open} 
                            className="justify-between w-[220px]"
                        >
                            {location
                            ? location.regionLabel
                            : "Select station..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-0 z-[2000]">
                        <Command>
                        <CommandInput placeholder="Search station..." className="h-9"/>
                        <CommandList>
                            <CommandEmpty>Station not found.</CommandEmpty>
                            <CommandGroup>
                            {stations.map((station) => (
                                <CommandItem
                                key={station.id}
                                value={station.regionLabel}
                                onSelect={() => {
                                    setStationId(station.id)
                                    setOpen(false)
                                }}
                                >
                                {station.regionLabel}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    stationId === station.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default HomeHeader