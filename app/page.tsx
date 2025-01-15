"use client";

import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      <div className="">
        {isConnected && (
          <div className="space-y-8">
            <p>Welcome to xToken </p>
          </div>
        )}
      </div>
    </div>
  );
}
