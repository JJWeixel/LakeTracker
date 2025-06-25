import HomeHeader from "./components/HomeHeader"
import { useTheme } from "@/components/theme/theme-provider"
import { TriangleAlert } from "lucide-react"
import { TemperatureSlider } from "@/components/ui/temperature-slider"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { Compass } from "./components/Compass"

  
function Home() {
    const { theme, setTheme } = useTheme()

    const handleThemeToggle = () => {
        // Handle theme toggle logic here
        if (theme === "dark") {
            setTheme("light")
        }
        else {
            setTheme("dark")
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="h-full w-full m-4">
                <SidebarTrigger/>
                <HomeHeader />
                <div className="w-full py-4 flex grow flex-col text-5xl gap-4 items-center">
                    <div className="h-40 w-7/8 flex flex-row border bg-accent rounded-2xl items-center justify-around">
                        <div className="flex flex-col items-center">
                            <div>52&deg;F</div>
                            <div className="flex flex-col items-center text-gray-500">
                                <div className="text-base">Prev 7 Days</div>
                                <Separator />
                                <div className="w-full flex flex-row justify-between gap-4 items-center">
                                    <div className="text-base">H: 54&deg;F</div>
                                    <div className="text-base">L: 50&deg;F</div>
                                </div>
                            </div>
                         </div>
                        <TemperatureSlider defaultValue={[52]} className="w-2/3 z-0" disabled />
                    </div>

                    <div className="h-30 w-7/8 flex flex-row gap-4 px-8 border bg-accent rounded-2xl items-center">
                        <TriangleAlert className="size-15" color="#ed2939" />
                        <div className="text-3xl line-clamp-1">Small craft advisory Sunday from 7 PM - 11 AM</div>
                    </div>

                    <div className="h-60 w-7/8 flex flex-row gap-4 justify-between">
                        <div className="w-1/2 flex flex-row border bg-accent rounded-2xl justify-between px-8 items-center">
                            <Compass />
                            <div className="h-full flex flex-col items-center py-4 justify-start gap-4">
                                <div className="text-3xl text-gray-500">Wind</div>
                                <Separator />
                                <div className="text-2xl">15-20 Knots</div>
                                <Separator />
                                <div className="text-2xl">Northeast</div>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-row border bg-accent rounded-2xl justify-between px-8 items-center">
                            <div className="text-3xl">Design Element</div>
                            <div className="h-full w-40 flex flex-col items-center py-4 justify-start gap-4">
                                <div className="text-3xl text-gray-500">Waves</div>
                                <Separator />
                                <div className="text-2xl">1-3 feet</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-70 w-7/8 flex flex-col border bg-accent rounded-2xl items-center py-2 gap-4">
                        <div className="text-3xl flex flex-col gap-2 items-center">
                            <div>History</div>
                            <Separator />
                        </div>
                        <div></div>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Home;