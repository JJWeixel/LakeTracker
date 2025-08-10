import HomeHeader from "./components/HomeHeader"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import DataChart from "./components/DataChart"

import TemperatureCard from "./components/TemperatureCard"
import AlertsCard from "./components/AlertsCard"
import WaveCard from "./components/WaveCard"
import WindCard from "./components/WindCard"
  
const Home : React.FC = () => {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="h-full w-full m-4">
                <SidebarTrigger/>
                <HomeHeader />
                <div className="w-full py-4 flex grow flex-col text-5xl gap-4 items-center">
                    <TemperatureCard />
                    <AlertsCard />
                    <div className="w-7/8 flex flex-row gap-4 justify-between">
                        <WindCard />
                        <WaveCard />
                    </div>
                    <DataChart />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Home;