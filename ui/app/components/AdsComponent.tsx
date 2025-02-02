"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAdsStore } from "../stores/AdsStore";
import { adsAnimationConfig } from "../common/AdsAnimationConfig";
import VideoPlayer from "./VideoPlayerContainer";
import ImageContainer from "./ImageContainerComponent";

export default function Ads() {
  return (
    <motion.div
      className="w-full mt-8"
      variants={adsAnimationConfig.contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div
        className="bg-white p-1 rounded-lg shadow-lg cursor-pointer hover:shadow-xl w-full">
        <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
          {useAdsStore.getState()?.ads[useAdsStore.getState().activeIndex]?.type === "video" && <VideoPlayer />}
          {useAdsStore.getState()?.ads[useAdsStore.getState().activeIndex]?.type === "image" && <ImageContainer isFullscreen={false} />}
        </div>
      </div>
    </motion.div>
  );
}
