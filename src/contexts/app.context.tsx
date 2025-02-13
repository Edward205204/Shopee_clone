import React, { useState, createContext } from 'react';
import { getAccessTokenFromLS } from '../utils/auth';

export interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: IAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
};

export const AppContext = createContext<IAppContext>(initialState);

function useAppContext({
  children
}: React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated);

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>;
}

export default useAppContext;
