"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  AreaSeries,
  type Time,
  type SeriesDataItemTypeMap,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";
import { TCandle } from "@/types/candle";
import { TChartView } from "@/types/chartView";

// Convert OHLC -> value (close)
function toAreaData(candles: TCandle[]): SeriesDataItemTypeMap["Area"][] {
  return candles.map((c) => ({
    time: c.time as Time,
    value: c.close,
  }));
}

function addChartSeries(
  chartView: TChartView,
  chart: ReturnType<typeof createChart>
) {
  if (chartView === "line") {
    return chart.addSeries(AreaSeries, {
      lineColor: "#A78BFA",
      topColor: "rgba(167, 139, 250, 0.4)",
      bottomColor: "rgba(167, 139, 250, 0.1)",
    });
  }

  return chart.addSeries(CandlestickSeries, {
    upColor: "#22C55E",
    downColor: "#EF4444",
    borderDownColor: "#EF4444",
    borderUpColor: "#22C55E",
    wickDownColor: "#EF4444",
    wickUpColor: "#22C55E",
  });
}

type PriceChartProps = {
  candles: TCandle[];
  chartView: TChartView;
};

export default function PriceChart({ candles, chartView }: PriceChartProps) {
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
        fixRightEdge: false,
        lockVisibleTimeRangeOnResize: false,

        timeVisible: true,
        secondsVisible: false,
      },
      handleScale: false,
      handleScroll: false,
    });

    chartRef.current = chart;

    const series = addChartSeries(chartView, chart);

    seriesRef.current = series;

    // ResizeObserver to auto-fit chart when container width changes
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.applyOptions({ width });

      // Debounced auto-fit
      clearTimeout((chart as any)._fitTimeout); // eslint-disable-line @typescript-eslint/no-explicit-any
      // eslint-disable-next-line
      (chart as any)._fitTimeout = setTimeout(() => {
        chart.timeScale().fitContent();
      }, 50);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [chartView]);

  // Update data whenever candles change
  useEffect(() => {
    if (!chartRef.current) return;

    // Remove old series
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    // Create new series
    seriesRef.current = addChartSeries(chartView, chartRef.current);
  }, [chartView]);

  useEffect(() => {
    if (!seriesRef.current || !candles || candles.length === 0) return;

    const data = chartView === "line" ? toAreaData(candles) : candles;

    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [candles, chartView]);

  return <div ref={containerRef} className="w-full h-[400px]" />;
}
