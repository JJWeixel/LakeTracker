import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"  
import { Switch } from "@/components/ui/switch"
import HomeHeader from "./components/HomeHeader"
import type { FormEvent } from "react"
import { useTheme } from "@/components/theme/theme-provider"
import { Compass, Sun, TriangleAlert } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

  
const Home = () => {
    const {theme, setTheme} = useTheme()

    const handleThemeToggle = () => {
        // Handle theme toggle logic here
        if (theme === "dark") {
            setTheme("light");
        }
        else {
            setTheme("dark");
        }
    }

    return (
        <div className="w-screen h-[200vh] flex flex-col gap-4 justify-items-center">
            <HomeHeader/>
            <div className="pt-4 flex flex-row grow">
                <div className="w-60 flex flex-col justify-self-start justify-start justify-items-start text-2xl bg-background gap-2 inset-shadow-xl/30">
                    <div className="w-full h-10 flex text-sm justify-center font-bold items-center bg-card">Menu</div>
                    <div className="w-full text-sm underline justify-start font-semibold pl-4">Settings</div>
                    <div className="flex flex-col justify-start gap-2">
                        <div className="z=1 flex flex-row items-center justify-between pl-4">
                            <Label htmlFor="unit-toggle">Celsius</Label>
                            <Switch 
                            id="unit-toggle"
                            className="z-1"/>
                        </div>
                        <div className="flex flex-row items-center justify-between pl-4">
                            <Label htmlFor="theme-toggle">Toggle dark mode</Label>
                            <Switch 
                            id="theme-toggle" 
                            checked={theme === "dark"} 
                            onCheckedChange={checked => setTheme(checked ? "dark" : "light")} />
                        </div>
                    </div>
                </div>
                <div className="w-40 flex grow flex-col justify-start items-start text-5xl pl-4 gap-4">
                    <div className="h-40 w-7/8 flex flex-row border bg-accent rounded-2xl items-center justify-around gap-4">
                        <Sun className="size-30" color="#ffde21"/>
                        <Slider defaultValue={[52]} className="w-1/2 z-0"></Slider>
                        <div>52&deg;F</div>
                    </div>
                    <div className="h-30 w-7/8 flex flex-row gap-4 px-8 border bg-accent rounded-2xl justify-start items-center">
                        <TriangleAlert className="size-15" color="#ed2939"></TriangleAlert>
                        <div className="text-4xl overflow-hidden line-clamp-1">Small craft advisory Sunday from 7 PM - 11 AM</div>
                    </div>
                    <div className="h-40 w-7/8 flex flex-row gap-4 justify-between">
                        <div className="h-40 w-1/2 flex flex-row border bg-accent rounded-2xl justify-between px-8 gap-8 items-center">
                            <div className="text-3xl">Compass Bar</div>
                            <div className="h-full w-40 flex flex-col items-center justify-between py-4">
                                <div className="text-3xl opacity-40">Wind</div>
                                <Separator />
                                <div className="text-2xl">15-20 Knots</div>
                                <Separator />
                                <div className="text-2xl">Northeast</div>
                            </div>
                        </div>
                        <div className="h-40 w-1/2 flex flex-row border bg-accent rounded-2xl justify-between px-8 gap-8 items-center">
                            <div className="text-3xl">Design Element</div>
                            <div className="h-full w-40 flex flex-col items-center justify-between py-4">
                                <div className="text-3xl opacity-40">Waves</div>
                                <Separator />
                                <div className="text-2xl">1-3 feet</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-70 w-7/8 flex flex-col border bg-accent rounded-2xl justify-between py-2 gap-4 items-center">
                        <div className="h-auto w-auto flex flex-col gap-2 text-3xl justify-start items-center">
                            <div>History</div>
                            <Separator/>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;