import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"

const AlertsCard = () => {
    return (
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
    )
}

export default AlertsCard;