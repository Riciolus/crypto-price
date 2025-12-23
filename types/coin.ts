import { TSymbol } from "./symbol";

export type TCoinSecurity = {
  consensus: string;
  hashAlgorithm?: string;
  notes: string;
};

export type TCoinMeta = {
  symbol: TSymbol;
  name: string;
  icon: string;
  about: string;
  security: TCoinSecurity;
};
