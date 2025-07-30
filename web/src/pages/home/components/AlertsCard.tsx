import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import useAlerts from "@/hooks/useAlerts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, TriangleAlert } from "lucide-react"
import React from "react";

const AlertsCard : React.FC = () => {
    const { getAlerts } = useAlerts();
    const { data } = useQuery({
        queryKey: ["alerts"],
        queryFn: getAlerts
    });
    const [openStates, setOpenStates] = React.useState<Record<number, boolean>>({});

    return (
        <Card className="w-7/8 gap-2">
            <CardHeader>
                <CardTitle className="text-3xl">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
            {data?.length ? (
                data.map((alert, idx) => (
                    <Collapsible
                        key={idx}
                        open={openStates[idx] || false}
                        onOpenChange={(open) =>
                            setOpenStates((prev) => ({ ...prev, [idx]: open }))
                        }
                        className="flex w-full flex-col gap-2"
                    >

                        <div
                            key={idx}
                            className="flex flex-row gap-4 justify-start items-center mb-2"
                        >
                            <TriangleAlert className="size-12" color="#ed2939" />
                            <div className="text-3xl line-clamp-1">{ alert.properties.event }</div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="icon" className="px-2 opacity-50">
                                {openStates[idx] ? (
                                    <ChevronUp className="size-8" />
                                    ) : (
                                    <ChevronDown className="size-8" />
                                    )
                                }
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="flex flex-col gap-2 text-sm pl-[50px]">
                            <div>
                                <strong>Effective:</strong>{" "}
                                    { new Date(alert.properties.effective).toLocaleString("en-US", {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                    }) }
                            </div>
                            <div>
                                <strong>Onset:</strong>{" "}
                                    { new Date(alert.properties.onset).toLocaleString("en-US", {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                    }) }
                            </div>
                            <div>
                                <strong>Ends:</strong>{" "}
                                    { new Date(alert.properties.ends).toLocaleString("en-US", {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                    }) }
                            </div>
                            <div>
                                <strong>Severity:</strong> { alert.properties.severity }
                            </div>
                            <div>
                                <strong>Description:</strong> { alert.properties.description }
                            </div>
                            <div>
                                <strong>Instruction:</strong> { alert.properties.instruction }
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))
                ) : (
                <div>No alerts</div>
                )}
            </CardContent>
        </Card>
    )
}

export default AlertsCard;