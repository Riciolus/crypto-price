import { TCoinMeta } from "@/types/coin";

const CoinOverview = ({ coin }: { coin: TCoinMeta }) => {
  return (
    <div className="bg-neutral-900/70 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">About {coin.name}</h2>
      <p className="text-gray-300">{coin.about}</p>
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Security</h3>
        <p className="text-gray-400">{coin.security.consensus}</p>
        {coin.security.hashAlgorithm && (
          <p className="text-gray-400">
            Hash Algorithm: {coin.security.hashAlgorithm}
          </p>
        )}
        <p className="text-gray-400">{coin.security.notes}</p>
      </div>
    </div>
  );
};

export default CoinOverview;
