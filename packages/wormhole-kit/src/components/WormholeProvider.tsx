import { createContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import {
  type Chain,
  type Network,
  wormhole,
  type Wormhole,
} from '@wormhole-foundation/sdk';

import { buildRedeemTx } from './buildRedeemTx';
import { buildTransferTx } from './buildTransferTx';
import { getPlatform } from './utils/getPlatform';

import type { IReqRedeemTx, IReqTransferTx } from './types';

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
  chains: Chain[];
  network: Network;
  children: ReactNode;
}) => {
  const initialized = useRef<boolean>(false);
  const [wh, setWh] = useState<
    Wormhole<'Mainnet' | 'Testnet' | 'Devnet'> | undefined
  >(undefined);
  useEffect(() => {
    const initWh = async () => {
      if (!initialized.current) {
        initialized.current = true;
        const temp = await wormhole(
          network,
          chains.map((chain) => getPlatform(chain)),
        );
        setWh(temp);
      }
    };
    initWh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WormholeContext.Provider
      value={{
        buildTransferTx: (req: IReqTransferTx) => {
          if (wh) {
            return buildTransferTx(wh, req);
          }
          throw new Error('wormhole error');
        },
        buildRedeemTx: (req: IReqRedeemTx) => {
          if (wh) {
            return buildRedeemTx(wh, req);
          }
          throw new Error('wormhole error');
        },
      }}
    >
      {children}
    </WormholeContext.Provider>
  );
};
