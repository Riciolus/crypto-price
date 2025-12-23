import { TCurrency } from "@/types/currency";
import Image from "next/image";
import SymbolSelector from "./SymbolSelector";
import { CURRENCY_META } from "@/lib/marketMeta";
import { TCoinMeta } from "@/types/coin";

type HeaderProps = {
  price: number | null;
  loading: boolean;
  coin: TCoinMeta;
  currency: TCurrency;
};

export default function CoinHeader({ price, loading, coin, currency }: HeaderProps) {
  const cmeta = CURRENCY_META[currency];

  const formattedPrice =
    price !== null
      ? new Intl.NumberFormat(cmeta.locale, {
          maximumFractionDigits: cmeta.fractionDigits,
        }).format(price)
      : null;

  return (
    <div className="pt-5 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 ">
          <div className="relative w-6 h-6">
            <Image alt="" src={coin.icon} fill />
          </div>
          <h1 className="text-xl font-semibold text-neutral-100">{coin.name}</h1>
          <h3 className="text-lg font-semibold text-zinc-500 font-mono">
            #{coin.symbol}
          </h3>
        </div>

        <SymbolSelector />
      </div>

      <div>
        <h2 className="text-4xl font-bold h-10 flex items-center">
          {loading ? (
            <span className="w-52 h-8 rounded-md bg-gray-700/40 animate-pulse" />
          ) : formattedPrice ? (
            <span>
              {cmeta.symbol}
              {formattedPrice}
            </span>
          ) : (
            <span className="text-gray-500">—</span>
          )}
        </h2>
      </div>

      <p className="text-sm font-semibold text-gray-400">
        {coin.name} Price Chart ({coin.symbol}/{currency})
      </p>
    </div>
  );
}
