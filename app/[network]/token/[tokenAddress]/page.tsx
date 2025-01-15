import { TokenChart } from "@/components/token-chart";
import { TokenStats } from "@/components/token-stats";
import { getTokenData } from "@/lib/geckoterminal";

interface Props {
  params: {
    tokenAddress: string;
    network: string;
  };
}

const Page = async (props: Props) => {
  const { tokenAddress } = props.params || {};
  const response = await getTokenData(tokenAddress);

  return (
    <div className="mt-5 space-y-4">
      {/* Token Stats */}
      <TokenStats data={response} />
      <TokenChart
        data={{
          address: response.address,
          symbol: response.symbol,
        }}
      />
    </div>
  );
};

export default Page;
