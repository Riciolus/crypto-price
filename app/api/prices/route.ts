import { fetchHistoricalCandles } from "@/lib/cryptocompare";
import { getRedisClient } from "@/lib/redis";
import { CURRENCIES, TCurrency } from "@/types/currency";
import { SYMBOLS, TSymbol } from "@/types/symbol";
import { TTimeframe } from "@/types/timeframe";

const TTL_MAP: Record<TTimeframe, number> = {
  "1h": 60,
  "1d": 300,
  "1w": 900,
};

function isTimeframe(value: string): value is TTimeframe {
  return value in TTL_MAP;
}

function isSymbol(value: string): value is TSymbol {
  return SYMBOLS.includes(value as TSymbol);
}

function isCurrency(value: string): value is TCurrency {
  return CURRENCIES.includes(value as TCurrency);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawTimeframe = searchParams.get("timeframe") ?? "1h";
  const symbol = searchParams.get("symbol") || "BTC";
  const currency = searchParams.get("currency") || "USD";

  if (!isTimeframe(rawTimeframe)) {
    return Response.json({ message: "Invalid timeframe" }, { status: 400 });
  }

  if (!isSymbol(symbol)) {
    return Response.json({ message: "Invalid symbol" }, { status: 400 });
  }

  if (!isCurrency(currency)) {
    return Response.json({ message: "Invalid currency" }, { status: 400 });
  }

  const timeframe = rawTimeframe;

  try {
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

    const ttl = TTL_MAP[timeframe];
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
