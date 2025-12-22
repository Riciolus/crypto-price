import { CURRENCY_META, SYMBOL_META } from "@/lib/marketMeta";
import { TCurrency } from "@/types/currency";
import { TSymbol } from "@/types/symbol";
import Image from "next/image";
import SymbolSelector from "./SymbolSelector";

type HeaderProps = {
  price: number | null;
  loading: boolean;
  symbol: TSymbol;
  currency: TCurrency;
  onSymbolChange: (symbol: TSymbol) => void;
};

export default function Header({
  price,
  loading,
  symbol,
  currency,
  onSymbolChange,
}: HeaderProps) {
  const smeta = SYMBOL_META[symbol];
  const cmeta = CURRENCY_META[currency];
  const meta = { ...smeta, ...cmeta };

  const formattedPrice =
    price !== null
      ? new Intl.NumberFormat(meta.locale, {
          maximumFractionDigits: meta.fractionDigits,
        }).format(price)
      : null;

  return (
    <div className="pt-5 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 ">
          <div className="relative w-6 h-6">
            <Image alt="" src={meta.icon} fill />
          </div>
          <h1 className="text-xl font-semibold text-neutral-100">{meta.name}</h1>
          <h3 className="text-lg font-semibold text-zinc-500 font-mono">
            #{symbol}
          </h3>
        </div>

        <SymbolSelector onChange={onSymbolChange} />
      </div>

      <div>
        <h2 className="text-4xl font-bold h-14 flex items-center">
          {loading ? (
            <span className="w-52 h-8 rounded-md bg-gray-700/40 animate-pulse" />
          ) : formattedPrice ? (
            <span>
              {meta.symbol}
              {formattedPrice}
            </span>
          ) : (
            <span className="text-gray-500">—</span>
          )}
        </h2>
      </div>

      <p className="text-sm font-semibold text-gray-400">
        {meta.name} Price Chart ({symbol}/{currency})
      </p>
    </div>
  );
}
