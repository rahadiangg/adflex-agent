"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayerContainer";
import { useAdsStore } from "../stores/AdsStore";
import { adsAnimationConfig } from "../common/AdsAnimationConfig";
import ImageContainer from "./ImageContainerComponent";

export default function AdsFullscreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        variants={adsAnimationConfig.overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white w-full h-full"
          variants={adsAnimationConfig.contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
        >
          <div className="relative min-w-screen min-h-screen overflow-hidden">
            {useAdsStore.getState()?.ads[useAdsStore.getState().activeIndex]?.type === "video" && <VideoPlayer />}
            {useAdsStore.getState()?.ads[useAdsStore.getState().activeIndex]?.type === "image" && <ImageContainer isFullscreen={true} />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
