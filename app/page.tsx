"use client";

import ChartControls from "@/components/ChartControls";
import ChartLoading from "@/components/ChartLoading";
import Header from "@/components/Header";
import PriceChart from "@/components/PriceChart";
import { getPriceCandles } from "@/lib/api";
import { SYMBOL_META } from "@/lib/marketMeta";
import { TCandle } from "@/types/candle";
import { TCurrency } from "@/types/currency";
import { TSymbol } from "@/types/symbol";
import { TTimeframe } from "@/types/timeframe";
import { useEffect, useState } from "react";

type TChartView = "line" | "candle";

export default function Home() {
  const [data, setData] = useState<TCandle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chartView, setChartView] = useState<TChartView>("line");

  const [timeframe, setTimeframe] = useState<TTimeframe>("1d");
  const [symbol, setSymbol] = useState<TSymbol>("BTC");
  const [currency, setCurrency] = useState<TCurrency>("USD");

  const latestPrice = data && data.length > 0 ? data[data.length - 1].close : null;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCandles() {
      setLoading(true);
      setError(null);

      try {
        const json = await getPriceCandles(
          { currency, symbol, timeframe },
          controller.signal
        );
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return; // expected, ignore
        }
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    fetchCandles();

    return () => {
      controller.abort();
    };
  }, [timeframe, currency, symbol]);

  return (
    <div className="flex justify-center ">
      <div className="p-3 flex flex-col space-y-5 w-full max-w-400 px-10 lg:px-6">
        <Header
          price={latestPrice}
          symbol={symbol}
          currency={currency}
          loading={loading}
        />

        <div className="space-y-2 md:space-y-1">
          <ChartControls
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            currency={currency}
            onCurrencyChange={setCurrency}
            chartView={chartView}
            onChartViewChange={setChartView}
          />
          <div className="py-3">
            {loading && <ChartLoading />}

            {!loading && data && <PriceChart candles={data} />}

            {!loading && !data && (
              <div className="h-[400px] flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}

            {error && (
              <div className="h-[400px] flex items-center justify-center text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
