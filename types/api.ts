export interface Token {
  data: {
    id: string;
    type: string;
    attributes: {
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      image_url: string;
      coingecko_coin_id: string;
      total_supply: string;
      price_usd: string;
      fdv_usd: string;
      total_reserve_in_usd: string;
      volume_usd: {
        h24: string;
      };
      market_cap_usd: string;
    };
    relationships: {
      top_pools: {
        data: [
          {
            id: string;
            type: string;
          },
          {
            id: string;
            type: string;
          },
          {
            id: string;
            type: string;
          }
        ];
      };
    };
  };
}

export interface TokenData {
  name: string;
  symbol: string;
  address: string;
  imageUrl: string;
  decimals: number;
  totalSupply: number;
  price: number;
  marketCap: number;
  fdv: number;
  volume24h: number;
  priceChange24h: number;
  totalLiquidity: number;
  securityInfo: {
    isProxy: boolean;
    hasAdmin: boolean;
    isCopycat: boolean;
  };
  taxes: {
    buyTax: boolean;
    sellTax: boolean;
  };
}

export interface SearchTokenData {
  id: Token["data"]["id"];
  name: Token["data"]["attributes"]["name"];
  symbol: Token["data"]["attributes"]["symbol"];
  address: Token["data"]["attributes"]["address"];
  imageUrl: Token["data"]["attributes"]["image_url"];
  priceUSD: Token["data"]["attributes"]["price_usd"];
  poolAddress: string;
}
