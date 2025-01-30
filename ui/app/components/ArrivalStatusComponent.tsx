"use client";

import React, { ReactElement } from "react";
import {
  AlarmClockCheck,
  CheckCircleIcon,
  ClockArrowDown,
  ClockArrowUp,
} from "lucide-react";
import { getArrivalInMinutes } from "@/app/common/GetArrivalInMinutes";

export function ArrivalStatus(arrivalTime: string): ReactElement {
  const diffInMinutes = getArrivalInMinutes(arrivalTime);

  if (diffInMinutes < 0) {
    return (
      <div className="flex gap-4 items-center text-emerald-600 font-bold">
        <CheckCircleIcon size={24} />
        <span>Arrived</span>
      </div>
    );
  } else if (diffInMinutes === 0) {
    return (
      <div className="flex gap-4 items-center text-amber-600 font-bold">
        <AlarmClockCheck size={24} />
        <span>Arriving now</span>
      </div>
    );
  } else if (diffInMinutes < 60) {
    const text = `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""}`;
    return (
      <div className="flex gap-4 items-center text-blue-600 font-bold">
        <ClockArrowDown size={24} />
        <span>{text}</span>
      </div>
    );
  } else {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    const text = `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
    return (
      <div className="flex gap-4 items-center text-blue-800 font-bold">
        <ClockArrowUp size={24} />
        <span>{text}</span>
      </div>
    );
  }
}
