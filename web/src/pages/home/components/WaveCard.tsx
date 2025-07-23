import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const WaveCard : React.FC = () => {
    return (
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
    )
}

export default WaveCard;