"use client"

import { getBusSchedule } from "@/app/apis/BusSchedule"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AlarmClockCheck, CheckCircleIcon, ClockArrowDown, ClockArrowUp } from "lucide-react"
import React, { ReactElement } from "react"

function getArrivalStatus(arrivalTime: string): ReactElement {
  const now = new Date()
  const arrival = new Date(arrivalTime)
  const diffInMinutes = Math.round((arrival.getTime() - now.getTime()) / 60000)

  if (diffInMinutes < 0) {
    return (<div className="flex gap-4 items-center">
      <CheckCircleIcon size={24} />
      <span>Arrived</span>
    </div>)
  } else if (diffInMinutes === 0) {
    return (<div className="flex gap-4 items-center">
      <AlarmClockCheck size={24} />
      <span>Arriving now</span>
    </div>)
  } else if (diffInMinutes < 60) {
    const text = `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""}`
    return (<div className="flex gap-4 items-center">
      <ClockArrowDown size={24} />
      <span>{text}</span>
    </div>)
  } else {
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    const text = `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
    return (<div className="flex gap-4 items-center">
      <ClockArrowUp size={24} />
      <span>{text}</span>
    </div>)
  }
}

export default function BusScheduleTable() {
  const { data, isError } = useQuery({
    queryFn: getBusSchedule,
    placeholderData: keepPreviousData,
    queryKey: ["busSchedule"],
    retry: 1,
    refetchInterval: 60000,
    refetchIntervalInBackground: true
  });

  return (
    <div>
      <Table className="border-2 border-b-4 border-gray-800 !rounded-lg p-4">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>BUS ID</TableHead>
            <TableHead>ROUTE</TableHead>
            <TableHead>DIRECTION</TableHead>
            <TableHead>ARRIVAL TIME</TableHead>
            <TableHead>ETA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isError && data?.map((bus, index) => (
            <TableRow key={index}>
              <TableCell>{bus.id}</TableCell>
              <TableCell>{bus.route}</TableCell>
              <TableCell>{bus.direction}</TableCell>
              <TableCell>{new Date(bus.arrival_time).toLocaleString()}</TableCell>
              <TableCell>{getArrivalStatus(bus.arrival_time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

