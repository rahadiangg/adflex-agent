import { configs } from "@/app/configs/Environment"
import { AdsScheduleResponse } from "../types/Ads"

export const getAdsSchedule = async () => {
  try {
    const response = await fetch(`${configs.provision_url}/api/ads`)
    if (!response.ok) {
      throw new Error("Failed to fetch ads schedule")
    }
    const data: AdsScheduleResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching ads schedule:", error)
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}