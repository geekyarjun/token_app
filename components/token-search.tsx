"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchTokens } from "@/lib/geckoterminal";
import { debounce } from "lodash";
import { CircleX, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchTokenData } from "@/types/api";

export function TokenSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchTokenData[]>([]);

  const router = useRouter();

  const debounceSearchToken = debounce(async (value) => {
    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchTokens(value);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching tokens:", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleSearch = (value: string) => {
    setQuery(value);
    debounceSearchToken(value);
  };

  const closeDialog = () => setOpen(false);
  const handleSelect = (token: SearchTokenData) => {
    closeDialog();
    router.push(`/eth/token/${token.address}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="2xl:w-[275px] lg:w-[225px] justify-start text-left font-normal border px-2 lg:px-4"
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="md:flex hidden text-muted-foreground">
            Search tokens...
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[600px] p-3"
        hideCross
      >
        <div className="grid gap-4">
          <div className="relative flex items-center gap-2">
            <Input
              placeholder="Search token by address or liquity pool"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-8"
              autoFocus
            />
            <Search
              className="absolute top-1/2 left-[6px] -translate-y-1/2"
              size={20}
            />
            <Button
              variant={"ghost"}
              onClick={closeDialog}
              className="hover:bg-transparent hover:text-slate-500 p-0"
            >
              <CircleX />
            </Button>
          </div>

          <div className="flex 2xl:h-[400px] lg:h-[350px] h-[300px] overflow-auto rounded-md border border-border/5">
            {loading ? (
              <div className="flex-1 p-4 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="flex-1 p-4 text-center text-sm text-muted-foreground">
                No tokens found
              </div>
            ) : (
              <div className="flex-1 divide-y divide-border/5">
                {results.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => handleSelect(token)}
                    className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors flex items-center justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={token.imageUrl}
                        alt={`${token.name} icon`}
                        width={34}
                        height={34}
                        className="w-[34px] h-[34px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {token.symbol}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {token.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {token.address.slice(0, 6)}...
                          {token.address.slice(-4)}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-medium text-white text-muted-foreground">
                      ${token.priceUSD}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
