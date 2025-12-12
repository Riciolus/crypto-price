"use client";

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
          "/api/prices?symbol=BTC&currency=USD&timeframe=1h",
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="p-12">
        {!loading && data && <PriceChart candles={data} />}
      </div>
    </div>
  );
}
