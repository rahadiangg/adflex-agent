"use client";

import React from "react";
import { useAdsStore } from "../stores/AdsStore";
import { IImageContainerProps } from "../types/ImageContainer";

export default function ImageContainer(props: IImageContainerProps) {
  const adsStore = useAdsStore();

  return (
    <div className={`${props.isFullscreen ? 'min-h-screen': 'h-full'} relative w-full overflow-hidden bg-black`}>
      <img
        src={adsStore.ads[adsStore.activeIndex].source}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-[10px]"
      />
      <div className={`${props.isFullscreen ? 'min-h-screen': 'h-full'} relative w-full flex items-center justify-center`}>
        <img
          src={adsStore.ads[adsStore.activeIndex].source}
          alt="Main content"
          className={`${props.isFullscreen ? 'object-cover' : 'object-contain'}`}
        />
      </div>
    </div>
  );
}
