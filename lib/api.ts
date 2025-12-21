import { TCurrency } from "@/types/currency";
import { TSymbol } from "@/types/symbol";
import { TTimeframe } from "@/types/timeframe";

type TGetPriceCandles = {
  symbol: TSymbol;
  timeframe: TTimeframe;
  currency: TCurrency;
};

export async function getPriceCandles({
  currency,
  symbol,
  timeframe,
}: TGetPriceCandles) {
  const res = await fetch(
    `/api/prices?symbol=${symbol}&currency=${currency}&timeframe=${timeframe}`,
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return await res.json();
}
