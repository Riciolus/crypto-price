"use client";

import { TCandle } from "@/types/candle";
import { useEffect, useState } from "react";

export default function Home() {
  const [candles, setCandles] = useState<TCandle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandles() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "/api/prices?symbol=ETH&currency=USD&timeframe=1h",
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = await res.json();
        setCandles(json);
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {candles?.map((c) => (
          <pre key={c.time}>{JSON.stringify(c, null, 2)}</pre>
        ))}
      </main>
    </div>
  );
}
