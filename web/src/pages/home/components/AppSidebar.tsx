import { MoonIcon, SunIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const {theme, setTheme} = useTheme()
  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  return (
    <Sidebar variant="floating">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel>Units</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Button variant="ghost" className="size-5 shadow-sm" onClick={handleThemeToggle}>
              {
                theme === "light" ?
                <MoonIcon /> :
                <SunIcon />
              }
            </Button>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" defaultValue="fahrenheit">
                  <ToggleGroupItem value="fahrenheit">
                    &deg;F
                  </ToggleGroupItem>
                  <ToggleGroupItem value="celsius">
                    &deg;C
                  </ToggleGroupItem>
                </ToggleGroup>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" defaultValue="knots">
                  <ToggleGroupItem value="knots">
                    Knots
                  </ToggleGroupItem>
                  <ToggleGroupItem value="mph">
                    MPH
                  </ToggleGroupItem>
                  <ToggleGroupItem value="m/s">
                    m/s
                  </ToggleGroupItem>
                </ToggleGroup>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" defaultValue="feet">
                  <ToggleGroupItem value="feet">
                    feet
                  </ToggleGroupItem>
                  <ToggleGroupItem value="meters">
                    meters
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