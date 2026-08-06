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
        <div className="z-[1001] sticky top-4 left-0 right-0 mx-auto flex w-5/6 flex-col gap-4 rounded-2xl border bg-card/50 px-4 py-4 drop-shadow-sm backdrop-blur-xl md:px-8">
            <div className="flex w-full flex-row items-center gap-4 overflow-hidden">
                <Waves className="size-10 shrink-0 overflow-hidden md:size-14" />
                <div className="flex min-w-0 flex-row flex-grow justify-between text-sm md:text-base">
                    <span className="overflow-hidden line-clamp-1 text-2xl font-semibold md:text-5xl">LakeTracker</span>
                    <div className="hidden flex-col items-end justify-center gap-1 text-xs md:flex md:text-sm">
                        <span className="overflow-hidden line-clamp-1">Tracking conditions on Lake Erie</span>
                        <span className="overflow-hidden line-clamp-1">Made by JJ Weixel</span>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-end">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline"
                            role="combobox"
                            aria-expanded={open} 
                            className="w-full justify-between"
                        >
                            {location
                            ? location.regionLabel
                            : "Select station..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" sideOffset={8} collisionPadding={16} className="z-[2000] w-[var(--radix-popover-trigger-width)] p-0">
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