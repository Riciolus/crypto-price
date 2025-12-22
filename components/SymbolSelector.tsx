"use client";

import { TSymbol } from "@/types/symbol";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

type Props = {
  onChange: (symbol: TSymbol) => void;
};

export default function SymbolSelector({ onChange }: Props) {
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
          <DropdownMenu.Item
            onSelect={() => onChange("BTC")}
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
                <Image alt="" src="/bitcoin.webp" fill />
              </div>
              Bitcoin<span className="text-zinc-500 font-mono">(BTC)</span>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-neutral-700/80" />

          <DropdownMenu.Item
            onSelect={() => onChange("ETH")}
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
                <Image alt="" src="/ethereum.webp" fill />
              </div>
              Ethereum<span className="text-zinc-500 font-mono">(ETH)</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
