import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Theme } from '@radix-ui/themes';
import { Wormhole } from '@wormhole-foundation/sdk-connect';

import { buildRedeemTx } from './context/buildRedeemTx';
import { buildTransferTx } from './context/buildTransferTx';
import { getBalance } from './context/getBalance';
import { getTokenInfo } from './context/getTokenInfo';
import { loadPlotforms } from './loader';

import type {
  IReqBalance,
  IReqRedeemTx,
  IReqTokenInfo,
  IReqTransferTx,
  IResBalance,
  IResTokenInfo,
} from './types';
import type { Chain, Network } from '@wormhole-foundation/sdk-base';

import '@radix-ui/themes/styles.css';

export const WormholeContext = createContext({
  supportChains: (): Chain[] => {
    throw new Error();
  },
  getTokenInfo: (req: IReqTokenInfo): IResTokenInfo => {
    throw new Error();
  },
  getBalance: async (req: IReqBalance): Promise<IResBalance> => {
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
  theme,
  accentColor,
  network,
  chains,
  children,
}: {
  theme?: 'inherit' | 'light' | 'dark';
  accentColor?:
    | 'gray'
    | 'gold'
    | 'bronze'
    | 'brown'
    | 'yellow'
    | 'amber'
    | 'orange'
    | 'tomato'
    | 'red'
    | 'ruby'
    | 'crimson'
    | 'pink'
    | 'plum'
    | 'purple'
    | 'violet'
    | 'iris'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'jade'
    | 'green'
    | 'grass'
    | 'lime'
    | 'mint'
    | 'sky';
  network: Network;
  chains: Chain[];
  children: ReactNode;
}) => {
  const initialized = useRef<boolean>(false);
  const [wh, setWh] = useState<Wormhole<Network> | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      initialized.current = true;
      const loaded = (await loadPlotforms(chains)).map((p) => p.Platform);
      setWh(new Wormhole(network, loaded));
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
        getTokenInfo: (req: IReqTokenInfo): IResTokenInfo => {
          return getTokenInfo(wh, req);
        },
        getBalance: async (req: IReqBalance): Promise<IResBalance> => {
          return getBalance(wh, req);
        },
        buildTransferTx: async (req: IReqTransferTx): Promise<string> => {
          return buildTransferTx(wh, req);
        },
        buildRedeemTx: async (req: IReqRedeemTx): Promise<string> => {
          return buildRedeemTx(wh, req);
        },
      }}
    >
      <Theme appearance={theme} accentColor={accentColor || 'indigo'}>
        {children}
      </Theme>
    </WormholeContext.Provider>
  );
};

export const useWormhole = () => {
  return useContext(WormholeContext);
};
