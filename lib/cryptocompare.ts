import { type TCandle } from "@/types/candle";
import { type TTimeframe } from "@/types/timeframe";
import { TIMEFRAME_CONFIG } from "./timeframeConfig";

type FetchHistoricalParams = {
  symbol: string;
  currency: string;
  timeframe: TTimeframe;
};

const baseUrl = process.env.CRYPTO_COMPARE_URL;
const apiKey = process.env.CRYPTO_COMPARE_API_KEY;

export async function fetchHistoricalCandles(params: FetchHistoricalParams) {
  if (!baseUrl) {
    throw new Error("Missing CRYPTO_COMPARE_URL environment variable.");
  }
  if (!apiKey) {
    throw new Error("Missing CRYPTO_COMPARE_API_KEY environment variable.");
  }

  const { symbol, currency, timeframe } = params;

  const config = TIMEFRAME_CONFIG[timeframe];
  const endpoint = config.endpoint;
  const limit = config.limit;
  const aggregate = config.aggregate;

  const url = `${baseUrl}/data/v2/${endpoint}?fsym=${symbol}&tsym=${currency}&limit=${limit}${
    aggregate ? `&aggregate=${aggregate}` : ""
  }`;
  console.log("Fetching candles from URL:", url);

  const res = await fetch(url, {
    headers: {
      authorization: `Apikey ${apiKey}`,
    },
  });

  if (!res.ok) {
    throw new Error(`CryptoCompare error: ${res.status}`);
  }

  const json = await res.json();

  if (json.Response !== "Success") {
    throw new Error(`Provider error: ${json.Message || "Unknown error"}`);
  }

  const raw = json.Data?.Data;
  if (!Array.isArray(raw)) {
    throw new Error("Invalid provider data format.");
  }

  if (raw.length === 0) {
    throw new Error("Provider returned an empty candles array.");
  }

  const normalized: TCandle[] = raw.map((c) => ({
    time: c.time,
    open: Number(c.open),
    high: Number(c.high),
    low: Number(c.low),
    close: Number(c.close),
  }));

  return normalized;
}
