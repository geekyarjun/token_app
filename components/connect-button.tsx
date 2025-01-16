"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex bg-background rounded-full w-9 h-9 border"
          >
            <User size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-secondary space-y-1"
          onClick={() => disconnect()}
        >
          <DropdownMenuItem className="bg-background text-foreground flex gap-2 hover:bg-background focus:bg-background hover:text-foreground focus:text-foreground">
            <User size={16} />
            <p>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-background text-foreground flex gap-2 cursor-pointer hover:bg-neutral-01 focus:bg-neutral-01 hover:text-foreground focus:text-foreground">
            <LogOut size={16} /> <p>Log Out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={() => connect({ connector: injected() })}>
      Connect Wallet
    </Button>
  );
}
