"use client";

import Header from "@/components/Header";
import PriceChart from "@/components/PriceChart";
import { TCandle } from "@/types/candle";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<TCandle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "/api/prices?symbol=BTC&currency=USD&timeframe=1w",
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = await res.json();
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
  }, []);

  if (loading) return null;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-3 flex flex-col space-y-5 ">
      <Header />

      <div className="space-y-2 md:space-y-1">
        <p className="text-sm font-semibold">Bitcoin Price Chart (BTC)</p>

        <div className="md:flex md:justify-between md:flex-row-reverse space-y-1 md:space-y-0">
          <div className="py-1   flex space-x-2 rounded-lg bg-gray-700/30 h-fit text-gray-300/90 w-fit font-semibold">
            <Button>24H</Button>
            <Button>7D</Button>
            <Button>1M</Button>
            <Button>3M</Button>
          </div>

          <div className="flex md:flex-col space-y-1 space-x-1">
            <div className="py-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-fit font-semibold">
              <Button>Price</Button>
              <Button>Market Cap</Button>
              <Button>TradingView</Button>
            </div>
            <div className="py-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-fit font-semibold">
              <Button>a</Button>
              <Button>a</Button>
            </div>
          </div>
        </div>
      </div>
      <div>{!loading && data && <PriceChart candles={data} />}</div>
    </div>
  );
}

const Button = ({ children }: { children: string }) => {
  return (
    <button className="px-3 py-1 rounded-lg cursor-pointer font-mono">
      {children}
    </button>
  );
};
