import { BusScheduleResponse } from "../types/BusSchedule"

export const getBusSchedule = async () => {
  try {
    const response = await fetch("/api/bus-schedule")
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