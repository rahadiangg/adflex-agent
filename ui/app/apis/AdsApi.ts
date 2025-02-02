import { configs } from "@/app/configs/Environment"
import { AdsScheduleResponse } from "../types/Ads"
import { checkValidUrl } from "../common/CheckValidUrl"
import { checkValidMedia } from "../common/CheckValidMedia"

export const getAdsSchedule = async () => {
  try {
    const response = await fetch(`${configs.provision_url}/api/ads`)
    if (!response.ok) {
      throw new Error("Failed to fetch ads schedule")
    }
    const data: AdsScheduleResponse = await response.json()
    const ads = data.data.map((ad) => {
      const source = `${checkValidUrl(ad.source) ? '' : configs.provision_url}${ad.source}`
      return {
        ...ad,
        source,
        type: checkValidMedia(source) || ad.type,
        duration: Number(ad.duration)
      }
    })

    return ads
  } catch (error) {
    console.error("Error fetching ads schedule:", error)
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}