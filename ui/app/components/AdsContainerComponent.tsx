"use client";

import React, { useEffect } from "react";
import { useAdsStore } from "../stores/AdsStore";
import AdsFullscreen from "./AdsFullscreenComponent";
import Ads from "./AdsComponent";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdsSchedule } from "../apis/AdsApi";
import { configs } from "../configs/Environment";

export default function AdsContainer() {
  const { setAds, setNextAds, ads, activeIndex, isFullscreen} = useAdsStore();
  
  const { data, isError } = useQuery({
    queryFn: getAdsSchedule,
    placeholderData: keepPreviousData,
    queryKey: ["adsSchedule"],
    retry: Number(configs.ads_max_retry),
    refetchInterval: Number(configs.ads_interval),
    refetchIntervalInBackground: true,
  });

  useEffect(() => { 
    if (data) setAds(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const currentAds = ads[activeIndex];
    const timer = setTimeout(() => {
      setNextAds();
    }, currentAds.duration * 1000);

    return () => clearTimeout(timer);
  }, [ads, activeIndex]);

  return (
    <>
      {isError && <div className="text-red-500">Failed to fetch ads schedule</div>}
      {!isError && isFullscreen && <AdsFullscreen />}
      {!isError && !isFullscreen && <Ads />}
    </>
  );
}
