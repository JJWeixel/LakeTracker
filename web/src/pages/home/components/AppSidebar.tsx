import { MoonIcon, SunIcon } from "lucide-react"
import { useUnits } from "@/contexts/UnitsContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const { windUnits, setWindUnits, temperatureUnits, setTemperatureUnits, heightUnits, setHeightUnits } = useUnits();
  const {theme, setTheme} = useTheme()
  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const handleWindUnitsChange = (value: string) => {
    setWindUnits(value);
  }
  const handleTemperatureUnitsChange = (value: string) => {
    setTemperatureUnits(value);
  }
  const handleHeightUnitsChange = (value: string) => {
    setHeightUnits(value);
  }

  return (
    <Sidebar variant="floating" mobileSide="bottom">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel>Units</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex w-full justify-center py-2 shadow-sm">
                  <Button
                    variant="outline"
                    className="flex aspect-square size-12 items-center justify-center"
                    onClick={handleThemeToggle}
                  >
                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" 
                  value={temperatureUnits} 
                  onValueChange={(value) => {
                    if (value) {
                      handleTemperatureUnitsChange(value);
                    } else {
                      handleTemperatureUnitsChange(temperatureUnits); // Prevent deselection
                    }
                  }}
                >
                  <ToggleGroupItem value="F">
                    &deg;F
                  </ToggleGroupItem>
                  <ToggleGroupItem value="C">
                    &deg;C
                  </ToggleGroupItem>
                </ToggleGroup>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" 
                  value={windUnits} 
                  onValueChange={(value) => {
                    if (value) {
                      handleWindUnitsChange(value);
                    } else {
                      handleWindUnitsChange(windUnits); // Prevent deselection
                    }
                  }}
                >
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
                <ToggleGroup type="single" className="flex w-full py-2 shadow-sm" variant="outline" 
                  value={heightUnits} 
                  onValueChange={(value) => {
                    if (value) {
                      handleHeightUnitsChange(value);
                    } else {
                      handleHeightUnitsChange(heightUnits); // Prevent deselection
                    }
                  }}
                >
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