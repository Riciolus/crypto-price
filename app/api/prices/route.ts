import { fetchHistoricalCandles } from "@/lib/cryptocompare";
import { Timeframe } from "@/types/timeframe";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol") || "ETH";
    const currency = searchParams.get("currency") || "USD";
    const timeframe = (searchParams.get("timeframe") || "1h") as Timeframe;

    const candles = await fetchHistoricalCandles({
      symbol,
      currency,
      timeframe,
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
