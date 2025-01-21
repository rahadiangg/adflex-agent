"use client";

import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-2xl font-bold rounded-lg border-2 border-b-4 border-gray-800 py-6 px-8 text-center">
      {time.toLocaleString()}
    </div>
  );
}
