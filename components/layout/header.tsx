import Image from "next/image";
import Logo from "@/public/logo.png";
import { ConnectButton } from "../connect-button";
import { TokenSearch } from "../token-search";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-[10px] h-14">
      <Link href={"/"}>
        <Image src={Logo} alt="xDEX Logo" width={37} height={37} />
      </Link>
      <div className="flex gap-2 items-center">
        <TokenSearch />
        <ConnectButton />
      </div>
    </header>
  );
};
