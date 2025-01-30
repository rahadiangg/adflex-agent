"use client";

import React from "react";
import BusScheduleTable from "@/app/components/BusScheduleComponent";
import Clock from "@/app/components/Clock";
import { useAdsStore } from "../stores/AdsStore";
import AdsContainer from "./AdsContainerComponent";

export default function Main() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-0 relative overflow-hidden">
      <div className="container mx-auto mb-6 mt-24">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-4xl font-bold text-center text-white">Bus Schedule</h1>
          <Clock />
        </div>
      </div>
      <div className="container mx-auto w-full">
        <BusScheduleTable />
      </div>
      <div className="container mx-auto w-full overflow-auto">
        <AdsContainer />
      </div>
    </div>
  );
}
