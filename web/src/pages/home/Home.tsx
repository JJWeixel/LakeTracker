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
            <SidebarProvider defaultOpen={false}> 
            <AppSidebar />
            <main className="h-full w-full m-4 min-w-0">
                <SidebarTrigger/>
                <HomeHeader />
                <div className="w-full py-4 grid grid-cols-1 gap-4 text-5xl lg:grid-cols-2">
                    <div className="lg:col-span-2">
                        <TemperatureCard />
                    </div>
                    <div className="lg:col-span-2">
                        <AlertsCard />
                    </div>
                    <WindCard />
                    <WaveCard />
                    <div className="lg:col-span-2">
                        <DataChart />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Home;