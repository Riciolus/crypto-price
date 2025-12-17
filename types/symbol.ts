export const SYMBOLS = ["BTC", "ETH"] as const;
export type TSymbol = (typeof SYMBOLS)[number];
