"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { injected, useConnect } from "wagmi";

const AuthDialog = () => {
  const { connect } = useConnect();
  const { openAuthModal, setOpenAuthModal } = useAuth()!;

  return (
    <Dialog open={openAuthModal} onOpenChange={() => setOpenAuthModal(false)}>
      <DialogContent className="sm:max-w-[360px] p-3" hideCross>
        <div className="space-y-9">
          <p className="text-center text-base font-medium">Log In</p>
          <Button
            onClick={() => connect({ connector: injected() })}
            className="w-full"
          >
            Connect Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
