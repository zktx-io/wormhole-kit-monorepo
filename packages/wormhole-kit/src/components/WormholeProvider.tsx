import { createContext } from 'react';
import type { ReactNode } from 'react';

export const WormholeContext = createContext({
  // TODO
});

export const WormholeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WormholeContext.Provider value={{}}>
      {children}
    </WormholeContext.Provider>
  );
};
