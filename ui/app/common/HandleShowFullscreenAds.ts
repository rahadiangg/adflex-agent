"use client";

import { configs } from "../configs/Environment";
import { BusSchedule } from "../types/BusSchedule";
import { getArrivalInMinutes } from "./GetArrivalInMinutes";

export function isShowFullscreenAds(data: BusSchedule[] | undefined): boolean | undefined {
  return data?.filter((bus) => getArrivalInMinutes(bus.arrival_time) > Number(configs.min_ads_show_in_minutes))
    .every((bus) => getArrivalInMinutes(bus.arrival_time) > Number(configs.max_ads_show_in_minutes));
}