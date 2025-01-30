"use client";

import { getBusSchedule } from "@/app/apis/BusScheduleApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { configs } from "../configs/Environment";
import { ArrivalStatus } from "./ArrivalStatusComponent";
import { useAdsStore } from "../stores/AdsStore";
import { isShowFullscreenAds } from "../common/HandleShowFullscreenAds";

export default function BusSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const adsStore = useAdsStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, Number(configs.component_interval));

    return () => clearInterval(timer);
  }, []);

  const { data, isError } = useQuery({
    queryFn: getBusSchedule,
    placeholderData: keepPreviousData,
    queryKey: ["busSchedule"],
    retry: Number(configs.scheduler_max_retry),
    refetchInterval: Number(configs.scheduler_interval),
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    adsStore.setIsFullscreen(isShowFullscreenAds(data) as unknown as boolean);
  }, [currentTime]);

  return (
    <div>
      <Table className="border-2 border-b-4 border-sky-800 !rounded-lg p-4 bg-white">
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead>BUS ID</TableHead>
            <TableHead>ROUTE</TableHead>
            <TableHead>DIRECTION</TableHead>
            <TableHead>ARRIVAL TIME</TableHead>
            <TableHead>ETA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isError &&
            data?.map((bus, index) => (
              <TableRow key={index}>
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.route}</TableCell>
                <TableCell>{bus.direction}</TableCell>
                <TableCell>{new Date(bus.arrival_time).toString()}</TableCell>
                <TableCell>{ArrivalStatus(bus.arrival_time)}</TableCell>
              </TableRow>
            ))}
          {isError && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-500">
                Error fetching bus schedule
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
