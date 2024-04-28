// eslint-disable-next-line import/default
import React, { createContext } from 'react';

import type { IReqRedeemTx, IReqTransferTx } from '../types';

export const WormholeContext = createContext({
  buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
    throw new Error();
  },
  buildRedeemTx: async (req: IReqRedeemTx): Promise<string> => {
    throw new Error();
  },
});

export const WormholeProvider = ({
  chains,
  network,
  children,
}: {
  chains: ('Aptos' | 'Sui')[];
  network: 'Mainnet' | 'Testnet';
  children: React.ReactNode;
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
