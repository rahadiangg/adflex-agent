import type { BusSchedule } from "@/app/types/BusSchedule"

interface BusScheduleTableProps {
  schedule: BusSchedule[]
}

function getArrivalStatus(arrivalTime: string): string {
  const now = new Date()
  const arrival = new Date(arrivalTime)
  const diffInMinutes = Math.round((arrival.getTime() - now.getTime()) / 60000)

  if (diffInMinutes < 0) {
    return "Arrived"
  } else if (diffInMinutes === 0) {
    return "Arriving now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""}`
  } else {
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`
  }
}

export default function BusScheduleTable({ schedule }: BusScheduleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700">Bus ID</th>
            <th className="px-4 py-2 text-left text-gray-700">Route</th>
            <th className="px-4 py-2 text-left text-gray-700">Direction</th>
            <th className="px-4 py-2 text-left text-gray-700">Arrival Time</th>
            <th className="px-4 py-2 text-left text-gray-700">ETA</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((bus, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-4 py-2 border-t">{bus.id}</td>
              <td className="px-4 py-2 border-t">{bus.route}</td>
              <td className="px-4 py-2 border-t">{bus.direction}</td>
              <td className="px-4 py-2 border-t">{new Date(bus.arrival_time).toLocaleString()}</td>
              <td className="px-4 py-2 border-t">{getArrivalStatus(bus.arrival_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

