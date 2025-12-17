"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  AreaSeries,
  type Time,
  type SeriesDataItemTypeMap,
  ColorType,
} from "lightweight-charts";
import { TCandle } from "@/types/candle";

// Convert OHLC -> value (close)
function toAreaData(candles: TCandle[]): SeriesDataItemTypeMap["Area"][] {
  return candles.map((c) => ({
    time: c.time as Time,
    value: c.close,
  }));
}

type PriceChartProps = {
  candles: TCandle[];
};

export default function PriceChart({ candles }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Create chart + series once
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 400,
      layout: {
        textColor: "#E5E7EB",
        background: { type: ColorType.Solid, color: "#0a0a0a" }, // dark theme
      },
      grid: {
        vertLines: { color: "#0E0E0F" },
        horzLines: { color: "#1F1F23" },
      },
      timeScale: {
        rightOffset: 0,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: false,
      },
      handleScale: false,
      handleScroll: false,
    });

    chartRef.current = chart;

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#A78BFA",
      topColor: "rgba(167, 139, 250, 0.4)",
      bottomColor: "rgba(167, 139, 250, 0.1)",
    });

    seriesRef.current = series;

    return () => {
      chart.remove();
    };
  }, []);

  // Update data whenever candles change
  useEffect(() => {
    if (!seriesRef.current || !candles || candles.length === 0) return;

    const data = toAreaData(candles);
    seriesRef.current.setData(data);

    // Fit full width automatically
    chartRef.current?.timeScale().fitContent();
  }, [candles]);

  return <div ref={containerRef} className="w-full h-[400px]" />;
}
