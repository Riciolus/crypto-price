import { fetchHistoricalCandles } from "@/lib/cryptocompare";
import { getRedisClient } from "@/lib/redis";
import { TTimeframe } from "@/types/timeframe";

const TTL_MAP: Record<TTimeframe, number> = {
  "1h": 60,
  "1d": 300,
  "1w": 900,
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol") || "BTC";
    const currency = searchParams.get("currency") || "USD";
    const timeframe = (searchParams.get("timeframe") || "1h") as TTimeframe;

    const redis = getRedisClient();
    const key = `prices:${symbol}:${currency}:${timeframe}`;

    const cached = await redis.get(key);

    if (cached) {
      return Response.json(JSON.parse(cached));
    }

    const candles = await fetchHistoricalCandles({
      symbol,
      currency,
      timeframe,
    });

    const ttl = TTL_MAP[timeframe] ?? 60;
    await redis.set(key, JSON.stringify(candles), {
      EX: ttl,
    });

    return Response.json(candles);
  } catch (err) {
    console.error("[/api/prices] Error:", err);

    return Response.json(
      {
        message: "Failed to fetch historical prices.",
      },
      { status: 500 },
    );
  }
}
