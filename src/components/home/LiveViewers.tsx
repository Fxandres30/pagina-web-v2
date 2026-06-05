"use client";

import {
  useEffect,
  useState
} from "react";

import {
  Activity
} from "lucide-react";

import "@/styles/LiveViewers.css";

export default function LiveViewers() {

  const [viewers, setViewers] =
    useState(4);

  useEffect(() => {

    const generateViewers = () => {

      const random =
        Math.floor(
          Math.random() * 9
        ) + 2;

      setViewers(random);
    };

    generateViewers();

    const interval =
      setInterval(
        generateViewers,
        45000
      );

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="live-viewers">

  <Activity size={16} />

  <span>
    {viewers} personas conectadas ahora
  </span>

</div>
  );
}