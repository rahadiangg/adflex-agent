"use client";

export const configs = {
  // The provision URL is the URL of the provision server
  provision_url: process.env.NEXT_PUBLIC_PROVISION_URL,

  // The scheduler interval is the interval in milliseconds that the scheduler will fetch the data
  scheduler_interval: process.env.NEXT_PUBLIC_SCHEDULER_INTERVAL as unknown as number,

  // The scheduler max retry is the maximum retry of the scheduler when fetching the data
  scheduler_max_retry: process.env.NEXT_PUBLIC_SCHEDULER_MAX_RETRY as unknown as number,

  // The ads interval is the interval in milliseconds that the ads will be fetched
  ads_interval: process.env.NEXT_PUBLIC_ADS_INTERVAL as unknown as number,

  // The ads max retry is the maximum retry of the ads when fetching the data
  ads_max_retry: process.env.NEXT_PUBLIC_ADS_MAX_RETRY as unknown as number,

  // The component interval is the interval in milliseconds that the component will be re-rendered
  // If we want to be real-time, we can set this to 1000ms
  component_interval: process.env.NEXT_PUBLIC_COMPONENT_INTERVAL as unknown as number,

  // The show ads on every minutes is the interval in minutes that the ads will be shown
  // If there is no bus schedule within this range, the ads will be shown as fullscreen
  min_ads_show_in_minutes: process.env.NEXT_PUBLIC_MIN_ADS_SHOW_IN_MINUTES as unknown as number,
  max_ads_show_in_minutes: process.env.NEXT_PUBLIC_MAX_ADS_SHOW_IN_MINUTES as unknown as number,
}