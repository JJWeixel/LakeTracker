import HomeHeader from "./components/HomeHeader"
import { useTheme } from "@/components/theme/theme-provider"
import { Car, TriangleAlert } from "lucide-react"
import { TemperatureSlider } from "@/components/ui/temperature-slider"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { Compass } from "./components/Compass"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

  
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
                    <Card className="w-7/8">
                        <CardHeader>
                            <CardTitle className="text-3xl">Water Temperature</CardTitle>
                            <CardDescription>current conditions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row gap-4 justify-between items-center px-8">
                                <div>52&deg;F</div>
                                <div className="flex flex-col items-center text-gray-500">
                                    <div className="text-base">Prev 7 Days</div>
                                    <Separator />
                                    <div className="w-full flex flex-row justify-between gap-4 items-center">
                                        <div className="text-base">H: 54&deg;F</div>
                                        <div className="text-base">L: 50&deg;F</div>
                                    </div>
                                </div>
                                <TemperatureSlider defaultValue={[52]} className="w-2/3 z-0" disabled/>
                            </div>
                         </CardContent>
                    </Card>

                    <Card className="w-7/8 gap-2">
                        <CardHeader>
                            <CardTitle className="text-3xl">Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row gap-4 justify-start items-center">
                                <TriangleAlert className="size-15" color="#ed2939" />
                                <div className="text-3xl line-clamp-1">Small craft advisory Sunday from 7 PM - 11 AM</div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="w-7/8 flex flex-row gap-4 justify-between">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-3xl">Wind</CardTitle>
                                <CardDescription>direction & speed</CardDescription>
                            </CardHeader>
                            <CardContent className="h-full">
                                <div className="h-full flex flex-row gap-8 justify-between px-8 items-center">
                                    <Compass />
                                    <div className="flex flex-col items-center py-4 justify-start text-4xl gap-4">
                                        <div>15-20 Knots</div>
                                        <Separator />
                                        <div>Northeast</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-3xl">Waves</CardTitle>
                                <CardDescription>height</CardDescription>
                            </CardHeader>
                            <CardContent className="h-full">
                                <div className="h-full flex flex-row gap-8 justify-between px-8 items-center">
                                    <div className="text-3xl">Design Element</div>
                                    <div className="flex flex-col items-center py-4 text-4xl justify-start gap-4">
                                        <div>1-3 feet</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="w-7/8 h-80">
                        <CardHeader>
                            <CardTitle className="text-3xl">History</CardTitle>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Home;