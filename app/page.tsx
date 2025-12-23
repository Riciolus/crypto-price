import { COINS } from "@/lib/symbolMeta";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="p-3 flex flex-col w-full max-w-3xl px-10 lg:px-6">
        <div className="border-b border-neutral-700/50">
          <div className="w-full flex items-center gap-1  border-neutral-700/50 p-2">
            <h2 className=" text-zinc-400">Available Coins ▾</h2>
          </div>
          {Object.values(COINS).map((coin) => (
            <Link
              key={coin.symbol}
              href={`/coins/${coin.symbol.toLowerCase()}`}
              className="w-full flex items-center gap-1 border-t border-neutral-700/50 p-2 hover:bg-neutral-900 transition"
            >
              <div className="relative w-5 h-5">
                <Image src={coin.icon} alt={`${coin.name} icon`} fill />
              </div>
              <h2 className="text-lg font-semibold">{coin.name}</h2>
              <p className="text-sm text-gray-400 font-mono">#{coin.symbol}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
