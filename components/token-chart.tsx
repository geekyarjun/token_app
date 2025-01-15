"use client";

import { useEffect, useRef } from "react";

interface TokenChartProps {
  data?: {
    symbol: string;
    address: string;
  };
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export function TokenChart({ data }: TokenChartProps) {
  const container = useRef<HTMLDivElement>(null);
  console.log("data", data);

  useEffect(() => {
    console.log("in useEffect");
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${data?.symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(0, 0, 0, 1)",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container?.current?.appendChild(script);
  }, []);

  if (!data) return null;

  return (
    <div className="w-full h-[500px] border rounded-lg p-3 [&_iframe]:h-full">
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
