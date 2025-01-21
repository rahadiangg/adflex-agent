"use client"

import React from "react";
import BusScheduleTable from "@/app/components/BusSchedulerTable";
import Clock from "./Clock";

export default function Main() {
  return <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center px-4 md:px-0">
    <div className="mb-6">
      <Clock />
    </div>
    <div className="container mx-auto w-full">
      <BusScheduleTable />
    </div>
  </div>
}