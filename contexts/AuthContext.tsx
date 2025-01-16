"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useAccount } from "wagmi";

type TAuthContext = null | {
  openAuthModal: boolean;
  setOpenAuthModal: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<TAuthContext>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  useEffect(() => {
    if (isConnected) setOpenAuthModal(false);
  }, [isConnected]);

  return (
    <AuthContext.Provider value={{ openAuthModal, setOpenAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
