"use client";

import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      {!isConnected ? (
        <>
          <h1 className="bg-gradient-to-r from-[#D16BA5] via-22% via-44% via-67% via-80% via-96% to-[#5FFBF1] bg-clip-text text-transparent text-3xl md:text-5xl animated-background !leading-normal">
            Welcome to xToken
          </h1>
          <h4 className="text-base mt-2 text-muted-foreground font-light">
            Please connect your wallet to continue
          </h4>
        </>
      ) : (
        <h1 className="bg-gradient-to-r from-[#D16BA5] via-22% via-44% via-67% via-80% via-96% to-[#5FFBF1] bg-clip-text text-transparent text-3xl md:text-5xl animated-background !leading-normal">
          Amazing things are coming!
        </h1>
      )}
    </div>
  );
}
