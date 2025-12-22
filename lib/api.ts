import { TCurrency } from "@/types/currency";
import { TSymbol } from "@/types/symbol";
import { TTimeframe } from "@/types/timeframe";

type TGetPriceCandles = {
  symbol: TSymbol;
  timeframe: TTimeframe;
  currency: TCurrency;
};

export async function getPriceCandles(
  { currency, symbol, timeframe }: TGetPriceCandles,
  signal?: AbortSignal
) {
  const res = await fetch(
    `/api/prices?symbol=${symbol}&currency=${currency}&timeframe=${timeframe}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return await res.json();
}
