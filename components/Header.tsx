import Image from "next/image";

export default function Header() {
  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <div className="relative w-6 h-6">
          <Image alt="" src={"/bitcoin.webp"} fill />
        </div>
        <h1 className="text-xl font-semibold">Bitcoin</h1>
        <h3 className="text-lg font-semibold text-zinc-500 font-mono">#BTC</h3>
      </div>
    </div>
  );
}
