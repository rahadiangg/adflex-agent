import { create } from 'zustand'
import { AdsSchedule, IAdsStore } from '../types/Ads'

export const useAdsStore = create<IAdsStore>((set) => ({
  ads: [],
  isFullscreen: false,
  activeIndex: 0,
  setNextAds: () => set((state) => ({ activeIndex: (state.activeIndex + 1) % state.ads.length })),
  setIsFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
  setActiveIndex: (activeIndex: number) => set({ activeIndex }),
  setAds: (ads: AdsSchedule[]) => set({ ads })
}))