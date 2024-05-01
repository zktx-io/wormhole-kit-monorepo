import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Theme } from '@radix-ui/themes';

import { buildRedeemTx } from './context/buildRedeemTx';
import { buildTransferTx } from './context/buildTransferTx';
import { loadPlotforms } from './loader';

import type { IReqRedeemTx, IReqTransferTx, IWhPlatform } from './types';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

import '@radix-ui/themes/styles.css';

export const WormholeContext = createContext({
  supportChains: (): Chain[] => {
    throw new Error();
  },
  buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
    throw new Error();
  },
  buildRedeemTx: async (req: IReqRedeemTx): Promise<string> => {
    throw new Error();
  },
});

export const WormholeProvider = ({
  network,
  chains,
  children,
}: {
  network: Network;
  chains: Chain[];
  children: ReactNode;
}) => {
  const initialized = useRef<boolean>(false);
  const [platforms, setPlatforms] = useState<{ [key: string]: IWhPlatform }>(
    {},
  );

  useEffect(() => {
    const init = async () => {
      initialized.current = true;
      const temp = await loadPlotforms(network, chains);
      setPlatforms(temp);
    };
    !initialized.current && init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WormholeContext.Provider
      value={{
        supportChains: () => {
          return chains;
        },
        buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
          return buildTransferTx(platforms, req);
        },
        buildRedeemTx: async (req: IReqRedeemTx): Promise<string> => {
          return buildRedeemTx(network, platforms, req);
        },
      }}
    >
      <Theme>{children}</Theme>
    </WormholeContext.Provider>
  );
};

export const useWormhole = () => {
  return useContext(WormholeContext);
};
