import { TCoinMeta } from "@/types/coin";
import { TSymbol } from "@/types/symbol";

export const COINS: Record<TSymbol, TCoinMeta> = {
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "/bitcoin.webp",
    about: `
Bitcoin is a decentralized digital currency that operates without a central authority.
It uses a proof-of-work consensus mechanism.
    `,
    security: {
      consensus: "Proof of Work (PoW)",
      hashAlgorithm: "SHA-256",
      notes: "Highly secure due to massive network hash power.",
    },
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    icon: "/ethereum.webp",
    about: `
Ethereum is a programmable blockchain designed for smart contracts and dApps.
    `,
    security: {
      consensus: "Proof of Stake (PoS)",
      notes: "Security depends on validator stake and slashing mechanisms.",
    },
  },
};
