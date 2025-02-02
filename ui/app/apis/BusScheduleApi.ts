import { BusScheduleResponse } from "@/app/types/BusSchedule"
import { configs } from "@/app/configs/Environment"

export const getBusSchedule = async () => {
  try {
    const response = await fetch(`${configs.provision_url}/api/bus-schedule`)
    if (!response.ok) {
      throw new Error("Failed to fetch bus schedule")
    }
    const data: BusScheduleResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching bus schedule:", error)
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}