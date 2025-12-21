import { TTimeframe } from "@/types/timeframe";

export const TIMEFRAME_CONFIG: Record<
  TTimeframe,
  {
    endpoint: "histohour" | "histoday";
    limit: number;
    aggregate?: number;
  }
> = {
  "1h": {
    endpoint: "histohour",
    limit: 24,
  },
  "1d": {
    endpoint: "histoday",
    limit: 30,
  },
  "1w": {
    endpoint: "histoday",
    limit: 30,
    aggregate: 7,
  },
};
