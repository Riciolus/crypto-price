// lib/marketMeta.ts
import { TSymbol } from "@/types/symbol";

export const SYMBOL_META: Record<
  TSymbol,
  {
    name: string;
    icon: string;
  }
> = {
  BTC: {
    name: "Bitcoin",
    icon: "/bitcoin.webp",
  },
  ETH: {
    name: "Ethereum",
    icon: "/ethereum.webp",
  },
};

export const CURRENCY_META = {
  USD: {
    symbol: "$",
    locale: "en-US",
    fractionDigits: 2,
  },
  IDR: {
    symbol: "Rp",
    locale: "id-ID",
    fractionDigits: 0,
  },
} as const;
