"use client";

import { COINS } from "@/lib/symbolMeta";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SymbolSelector() {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="
            flex items-center
            rounded-md
            bg-neutral-800
            px-2 py-1
            font-semibold
            text-zinc-300
            hover:text-white
            focus:outline-none
            
          "
        >
          ▾
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="right"
          align="start"
          sideOffset={8}
          className="
              z-50
              min-w-[140px]
              rounded-md
              border border-neutral-700
              bg-neutral-900
              p-1
              shadow-lg

              data-[state=open]:animate-in
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=open]:fade-in-0
              data-[state=open]:zoom-in-95
              data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
  "
        >
          {Object.values(COINS).map((coin) => (
            <DropdownMenu.Item
              key={coin.symbol}
              onSelect={() => router.push(`/coins/${coin.symbol.toLowerCase()}`)}
              className="
            cursor-pointer
            rounded-sm
            px-2 py-1
            text-sm
            text-white
            hover:bg-neutral-800
            focus:bg-neutral-800
            focus:outline-none
          "
            >
              <div className="flex gap-2 items-center">
                <div className="relative w-4 h-4">
                  <Image src={coin.icon} alt={`${coin.name} icon`} fill />
                </div>
                {coin.name}
                <span className="text-zinc-500 font-mono">({coin.symbol})</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
