"use client"

import { useAdsStore } from "../stores/AdsStore";

export const adsAnimationConfig = {
  overlayVariants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  contentVariants: {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: useAdsStore.getState().isFullscreen ? 0.95 : 1 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "spring", duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    }
  }
};