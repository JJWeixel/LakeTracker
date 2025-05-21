import { Waves } from "lucide-react"

const HomeHeader = () => {
    return (
        <div className="z=[1001] gap-8 sticky flex top-4 left-0 right-0 mx-auto h-24 w-5/6 items-center rounded-2xl px-8 border bg-card/50 backdrop-blur-xl drop-shadow-sm">
            <Waves className="size-14 overflow-hidden" />
            <span className="text-5xl font-semibold">LakeTracker</span>
            <div className="flex flex-col justify-around items-start text-sm">
                <span className="overflow-hidden line-clamp-1">Tracking conditions on Lake Erie</span>
                <span className="overflow-hidden line-clamp-1">Made by JJ Weixel</span>
            </div>
        </div>
    )
}

export default HomeHeader