import React, { useState, createContext } from 'react';
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth';
import User from '../types/user';
import { Purchases } from '../types/purchases';

interface PurchasesState extends Purchases {
  disabled: boolean;
  checked: boolean;
}
export interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  purchaseState: PurchasesState[];
  setPurchaseState: React.Dispatch<React.SetStateAction<PurchasesState[]>>;
  reset: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  purchaseState: [],
  setPurchaseState: () => null,
  reset: () => null
});
const initialState = getInitialAppContext();
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialState);

export const AppProvider = ({
  children,
  defaultValue = initialState
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);
  const [purchaseState, setPurchaseState] = useState<PurchasesState[]>([]);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setPurchaseState([]);
  };

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, purchaseState, setPurchaseState, reset }}
    >
      {children}
    </AppContext.Provider>
  );
};
