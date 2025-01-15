import { SearchTokenData, Token, TokenData } from "@/types/api";

const GECKOTERMINAL_API = "https://api.geckoterminal.com/api/v2";
const NETWORK = "eth"; // Hard coded just for the demo

export async function searchTokens(query: string): Promise<SearchTokenData[]> {
  const response = await fetch(
    `${GECKOTERMINAL_API}/networks/${NETWORK}/tokens/${query}`
  );
  const data = (await response.json()) as Token;
  return [
    {
      id: data.data.id,
      name: data.data.attributes.name,
      symbol: data.data.attributes.symbol,
      address: data.data.attributes.address,
      imageUrl: data.data.attributes.image_url,
      priceUSD: data.data.attributes.price_usd,
      poolAddress: data.data.relationships.top_pools?.data?.[0]?.id,
    },
  ];
}

export async function getTokenData(address: string): Promise<TokenData> {
  const response = await fetch(
    `${GECKOTERMINAL_API}/networks/${NETWORK}/tokens/${address}`
  );
  const data = (await response.json()) as Token;
  const token = data.data;

  return {
    name: token.attributes.name,
    symbol: token.attributes.symbol,
    address: token.attributes.address,
    imageUrl: token.attributes.image_url,
    decimals: token.attributes.decimals,
    totalSupply: parseFloat(token.attributes.total_supply),
    price: parseFloat(token.attributes.price_usd || "0"),
    marketCap: parseFloat(token.attributes.market_cap_usd || "0"),
    fdv: parseFloat(token.attributes.fdv_usd || "0"),
    volume24h: parseFloat(token.attributes?.volume_usd?.h24 || "0"),
    priceChange24h: parseFloat("0"),
    totalLiquidity: parseFloat("0"),
    securityInfo: {
      isProxy: false,
      hasAdmin: false,
      isCopycat: false,
    },
    taxes: {
      buyTax: false,
      sellTax: false,
    },
  };
}
