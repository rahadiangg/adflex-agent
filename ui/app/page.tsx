"use client"

import { useState, useEffect } from "react"
import BusScheduleTable from "@/app/components/BusSchedulerTable"
import type { BusSchedule } from "@/app/types/BusSchedule"

interface BusScheduleResponse {
  code: number
  data: BusSchedule[]
  message: string
}

async function getBusSchedule(): Promise<BusSchedule[]> {
  try {
    const response = await fetch("/api/bus-schedule")
    if (!response.ok) {
      throw new Error("Failed to fetch bus schedule")
    }
    const data: BusScheduleResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching bus schedule:", error)
    return []
  }
}


export default function Home() {
  const [busSchedule, setBusSchedule] = useState<BusSchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSchedule = async () => {
      const schedule = await getBusSchedule()
      setBusSchedule(schedule)
      setIsLoading(false)
    }

    fetchSchedule()

    // Refresh data every minute
    const intervalId = setInterval(fetchSchedule, 60000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-7xl p-2">
        <h1 className="text-3xl font-bold mb-4 text-center">Bus Schedule</h1>
        {isLoading ? <p className="text-center">Loading...</p> : <BusScheduleTable schedule={busSchedule} />}
      </div>
    </main>
  )
}

