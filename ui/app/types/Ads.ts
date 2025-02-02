export interface IAdsProps {
  isFullscreen?: boolean
  onClose?: () => void;
}

export interface IAdsStore {
  ads: AdsSchedule[],
  isFullscreen: boolean
  activeIndex: number
  setIsFullscreen: (isFullscreen: boolean) => void
  setActiveIndex: (activeIndex: number) => void
  setAds: (ads: AdsSchedule[]) => void
  setNextAds: () => void
}

export interface AdsSchedule {
  type: string|boolean
  source: string
  duration: number
}

export interface AdsScheduleResponse {
  code: number
  data: AdsSchedule[]
  message: string
}