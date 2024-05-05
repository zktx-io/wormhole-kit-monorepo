import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Wormhole } from '@wormhole-foundation/sdk-connect';

import { buildRedeemTx } from './context/buildRedeemTx';
import { buildTransferTx } from './context/buildTransferTx';
import { getBalance } from './context/getBalance';
import { getSymbol } from './context/getSymbol';
import { loadPlotforms } from './loader';

import type {
  IReqBalance,
  IReqRedeemTx,
  IReqTokenInfo,
  IReqTransferTx,
  IResBalance,
  IResTransferTx,
} from './types';
import type { Chain, Network } from '@wormhole-foundation/sdk-base';
import type { ConfigOverrides } from '@wormhole-foundation/sdk-connect';

export const WormholeContext = createContext({
  supportChains: (): Chain[] => {
    throw new Error();
  },
  getSymbol: (req: IReqTokenInfo): string => {
    throw new Error();
  },
  getBalance: async (req: IReqBalance): Promise<IResBalance> => {
    throw new Error();
  },
  buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
    throw new Error();
  },
  buildRedeemTx: async (req: IReqRedeemTx): Promise<IResTransferTx> => {
    throw new Error();
  },
});

export const WhCoreProvider = ({
  network,
  chains,
  config,
  children,
}: {
  network: Network;
  chains: Chain[];
  config?: ConfigOverrides<Network>;
  children: ReactNode;
}) => {
  const initialized = useRef<boolean>(false);
  const [wh, setWh] = useState<Wormhole<Network> | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      initialized.current = true;
      const loaded = (await loadPlotforms(chains)).map((p) => p.Platform);
      setWh(new Wormhole(network, loaded, config));
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
        getSymbol: (req: IReqTokenInfo): string => {
          return getSymbol(wh, req);
        },
        getBalance: async (req: IReqBalance): Promise<IResBalance> => {
          return getBalance(wh, req);
        },
        buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
          return buildTransferTx(wh, req);
        },
        buildRedeemTx: async (req: IReqRedeemTx): Promise<IResTransferTx> => {
          return buildRedeemTx(wh, req);
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
