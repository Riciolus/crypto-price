export const CURRENCIES = ["USD", "IDR"] as const;
export type TCurrency = (typeof CURRENCIES)[number];
