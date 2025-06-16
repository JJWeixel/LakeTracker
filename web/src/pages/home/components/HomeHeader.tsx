import { ChevronsUpDown, Waves, Check } from "lucide-react"
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
import React from "react"
const regions = [
    {
      value: "cleveland",
      label: "Cleveland",
    },
    {
      value: "erie",
      label: "Erie",
    },
    {
      value: "toledo",
      label: "Toledo",
    }
  ]

const HomeHeader = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("");
    return (
        <div className="z-[1001] gap-8 sticky flex top-4 left-0 right-0 mx-auto h-24 w-5/6 items-center rounded-2xl px-8 border bg-card/50 backdrop-blur-xl drop-shadow-sm">
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
                            className="justify-between w-[200]"
                        >
                            {value
                            ? regions.find((region) => region.value === value)?.label
                            : "Select region..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 z-[2000]">
                        <Command>
                        <CommandInput placeholder="Search region..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Region not found.</CommandEmpty>
                            <CommandGroup>
                            {regions.map((framework) => (
                                <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                                >
                                {framework.label}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    value === framework.value ? "opacity-100" : "opacity-0"
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