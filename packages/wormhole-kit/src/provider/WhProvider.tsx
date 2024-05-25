// eslint-disable-next-line import/default
import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import { WhCoreProvider, WormholeContext } from '@zktx.io/wormhole-kit-core';

import type {
  Chain,
  Network,
  WormholeConfigOverrides,
} from '@zktx.io/wormhole-kit-core';

export const ModeContext = createContext({
  mode: 'light' as 'light' | 'dark',
});

export const WhProvider = ({
  network,
  chains,
  config,
  children,
  mode,
}: {
  network: Network;
  chains: Chain[];
  config?: WormholeConfigOverrides<Network>;
  children: ReactNode;
  mode: 'light' | 'dark';
}) => {
  return (
    <React.Fragment>
      <WhCoreProvider network={network} chains={chains} config={config}>
        <ModeContext.Provider
          value={{
            mode,
          }}
        >
          {children}
        </ModeContext.Provider>
      </WhCoreProvider>
    </React.Fragment>
  );
};

export const useMode = () => {
  return useContext(ModeContext);
};

export const useWormhole = () => {
  return useContext(WormholeContext);
};
