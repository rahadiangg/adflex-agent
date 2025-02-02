"use client";

export function getArrivalInMinutes(arrivalTime: string): number {
  const now = new Date();
  const arrival = new Date(arrivalTime);
  const diffInMinutes = Math.round((arrival.getTime() - now.getTime()) / 60000);

  return diffInMinutes;
}