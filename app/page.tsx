"use client";

import { Button } from "@/components/Button";
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
import { FaChartColumn, FaChartLine } from "react-icons/fa6";

type TChartView = "line" | "candle";

export default function Home() {
  const [data, setData] = useState<TCandle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chartView, setChartView] = useState<TChartView>("line");

  const [timeframe, setTimeframe] = useState<TTimeframe>("1d");
  const [symbol, setSymbol] = useState<TSymbol>("BTC");
  const [currency, setCurrency] = useState<TCurrency>("USD");

  const meta = SYMBOL_META[symbol];
  const latestPrice = data && data.length > 0 ? data[data.length - 1].close : null;

  useEffect(() => {
    async function fetchCandles() {
      setLoading(true);
      setError(null);

      try {
        const json = await getPriceCandles({ currency, symbol, timeframe });
        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCandles();
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
          <p className="text-sm font-semibold text-gray-400">
            {meta.name} Price Chart ({symbol}/{currency})
          </p>

          <div className="md:flex md:justify-between md:flex-row-reverse space-y-1 md:space-y-0">
            <div className="p-1  flex space-x-2 rounded-lg bg-gray-700/30 h-fit text-gray-300/90 w-fit font-semibold">
              <Button onClick={() => setTimeframe("1h")} active={timeframe === "1h"}>
                1H
              </Button>
              <Button onClick={() => setTimeframe("1d")} active={timeframe === "1d"}>
                1D
              </Button>
              <Button onClick={() => setTimeframe("1w")} active={timeframe === "1w"}>
                1W
              </Button>
              {/*<Button>3M</Button>*/}
            </div>

            <div className="flex md:flex-col space-y-1 space-x-1">
              <div className="p-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-fit font-semibold">
                <Button
                  onClick={() => setCurrency("USD")}
                  active={currency === "USD"}
                >
                  USD
                </Button>
                <Button
                  onClick={() => setCurrency("IDR")}
                  active={currency === "IDR"}
                >
                  IDR
                </Button>
              </div>
              <div className="p-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-full font-semibold">
                <Button
                  onClick={() => setChartView("line")}
                  active={chartView === "line"}
                >
                  <FaChartLine />
                </Button>
                <Button
                  onClick={() => setChartView("candle")}
                  active={chartView === "candle"}
                >
                  <FaChartColumn />
                </Button>
              </div>
            </div>
          </div>
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
