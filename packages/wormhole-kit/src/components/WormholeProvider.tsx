import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { IReqRedeemTx, IReqTransferTx } from './types';
import type { Network } from '@wormhole-foundation/sdk-connect';

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
  children,
}: {
  network: Network;
  children: ReactNode;
}) => {
  return (
    <WormholeContext.Provider
      value={{
        buildTransferTx: (req: IReqTransferTx) => {
          throw new Error('wormhole error');
        },
        buildRedeemTx: (req: IReqRedeemTx) => {
          throw new Error('wormhole error');
        },
      }}
    >
      {children}
    </WormholeContext.Provider>
  );
};

export const useContextWh = () => {
  return useContext(WormholeContext);
};
