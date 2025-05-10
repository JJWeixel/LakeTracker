import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"  
import { Switch } from "@/components/ui/switch"
import HomeHeader from "./components/HomeHeader"

  
const Home = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-4 justify-items-center">
            <HomeHeader/>
            <div className="flex flex-row grow">
                <div className="w-60 flex flex-col justify-self-start justify-start justify-items-start text-gray-600 text-2xl bg-white inset-shadow-xl/30">
                    <div className="w-full h-10 flex text-sm justify-center font-bold text-black items-center bg-gray-200">Menu</div>
                    <Button variant="ghost" className="w-full text-sm text-gray-600 font-sans justify-start">Settings</Button>
                    <div className="flex items-center justify-between pl-4">
                        <Label htmlFor="theme-toggle">Toggle dark mode</Label>
                        <Switch id="theme-toggle"></Switch>
                    </div>
                    <Button variant="ghost" className="w-full text-sm text-gray-600 font-sans justify-start">About</Button>

                </div>
                <div className="w-40 flex grow flex-row justify-center items-center text-gray-600 text-5xl bg-white">Main</div>
            </div>
        </div>
    )
}

export default Home;