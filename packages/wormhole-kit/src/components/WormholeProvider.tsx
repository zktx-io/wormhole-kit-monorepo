import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { buildRedeemTx } from './utils/buildRedeemTx';
import { buildTransferTx } from './utils/buildTransferTx';
import { getPlatforms } from './utils/getPlatforms';

import type { IReqRedeemTx, IReqTransferTx, IWhPlatform } from './types';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

export const WormholeContext = createContext({
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
      const temp = getPlatforms(network, chains);
      setPlatforms(temp);
    };
    !initialized.current && init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WormholeContext.Provider
      value={{
        buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
          return buildTransferTx(platforms, req);
        },
        buildRedeemTx: async (req: IReqRedeemTx): Promise<string> => {
          return buildRedeemTx(network, platforms, req);
        },
      }}
    >
      {children}
    </WormholeContext.Provider>
  );
};

export const useWormhole = () => {
  return useContext(WormholeContext);
};
