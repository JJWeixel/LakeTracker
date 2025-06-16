import { Calendar, Home, Inbox, MoonIcon, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupAction>
            <MoonIcon />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full" variant="outline">
                  <ToggleGroupItem value="fahrenheit">
                    &deg;F
                  </ToggleGroupItem>
                  <ToggleGroupItem value="celsius">
                    &deg;C
                  </ToggleGroupItem>
                </ToggleGroup>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full" variant="outline">
                  <ToggleGroupItem value="imperial">
                    Imperial
                  </ToggleGroupItem>
                  <ToggleGroupItem value="metric">
                    Metric
                  </ToggleGroupItem>
                </ToggleGroup>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}