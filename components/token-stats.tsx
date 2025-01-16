"use client";

import { formatNumber, formatWithUnits } from "@/lib/utils";
import { TokenData } from "@/types/api";
import Image from "next/image";

interface TokenStatsProps {
  loading?: boolean;
  data?: TokenData;
}

export function TokenStats({ data }: TokenStatsProps) {
  if (!data) return null;

  const basicStats = [
    { title: "Price", value: formatNumber(data.price) },
    { title: "Market Cap", value: formatNumber(data.marketCap) },
    { title: "FDV", value: formatWithUnits(data.fdv) },
    {
      title: "24h Change",
      value: formatNumber(data.priceChange24h, "percent"),
      change: data.priceChange24h,
    },
    { title: "24h Volume", value: formatWithUnits(data.volume24h) },
    { title: "Total Liquidity", value: formatNumber(data.totalLiquidity) },
    {
      title: "Total Supply",
      value: formatWithUnits(data.totalSupply, data.decimals),
    },
  ];

  const securityInfo = data.securityInfo && [
    {
      title: "Proxy Contract",
      value: data.securityInfo.isProxy ? "Yes" : "No",
    },
    { title: "Admin Access", value: data.securityInfo.hasAdmin ? "Yes" : "No" },
    {
      title: "Copycat Token",
      value: data.securityInfo.isCopycat ? "Yes" : "No",
    },
  ];

  const taxes = data.taxes && [
    { title: "Buy Tax", value: `${data.taxes.buyTax}%` },
    { title: "Sell Tax", value: `${data.taxes.sellTax}%` },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="border p-3 rounded-lg lg:flex gap-[62px]">
          <div className="flex items-center mb-3 lg:mb-0 gap-[6px] relative after:hidden lg:after:inline after:absolute after:-right-8 after:top-1/2 after:-translate-y-1/2 after:h-[60%] after:w-[2px] after:bg-neutral">
            <Image
              src={data.imageUrl}
              alt="token icon"
              width={26}
              height={26}
              className="rounded-full"
            />
            <p className="text-[11px] lg:text-xs">{data.symbol}</p>
            <p className="text-xs lg:text-sm font-semibold">{data.name}</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-5 gap-y-2 lg:flex lg:flex-1 lg:gap-6 justify-between lg:items-center lg:overflow-y-auto">
            {basicStats.map((stat, idx) => (
              <div
                key={idx}
                className="max-lg:items-flex-start flex flex-col gap-0.5 overflow-hidden"
              >
                <p className="text-neutral whitespace-nowrap text-xs font-normal">
                  {stat.title}
                </p>
                <div className="text-xs lg:text-sm font-semibold">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
