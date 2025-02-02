export interface BusSchedule {
  id: string
  arrival_time: string
  route: string
  direction: string
}

export interface BusScheduleResponse {
  code: number
  data: BusSchedule[]
  message: string
}
