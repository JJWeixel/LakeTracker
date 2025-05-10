import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"  
import { Switch } from "@/components/ui/switch"

  
const Home = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-4 justify-items-center bg-sky-200">
            <div className="flex flex-row pt-4 justify-start pl-10 items-baseline text-7xl">
                <div className="text-shadow-md">LakeTracker</div>
                <div className="text-base text-gray-600 pl-4">Lake Erie</div>
            </div>
            <div className="flex flex-row grow">
                <div className="w-60 flex flex-col justify-self-start justify-start justify-items-start text-gray-600 text-2xl bg-white inset-shadow-xl/30">
                    <div className="w-full h-10 flex text-sm justify-center font-bold text-black items-center bg-gray-200">Menu</div>
                    <Button variant="ghost" className="w-full text-sm text-gray-600 font-sans justify-start">Settings</Button>
                    <div className="flex items-center justify-start pl-4">
                        <Label>Toggle dark mode</Label>
                        <Switch></Switch>
                    </div>
                    <Button variant="ghost" className="w-full text-sm text-gray-600 font-sans justify-start">About</Button>

                </div>
                <div className="w-40 flex grow flex-row justify-center items-center text-gray-600 text-5xl bg-white">Main</div>
            </div>
        </div>
    )
}

export default Home;