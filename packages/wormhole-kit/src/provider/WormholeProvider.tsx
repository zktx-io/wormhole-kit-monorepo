import type { ReactNode } from 'react';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { WormholeCoreProvider } from '@zktx.io/wormhole-kit-core';

import type { Chain, Network } from '@wormhole-foundation/sdk-base';
import type { ConfigOverrides } from '@wormhole-foundation/sdk-connect';

export const WormholeProvider = ({
  network,
  chains,
  config,
  children,
  theme,
  accentColor,
}: {
  network: Network;
  chains: Chain[];
  config?: ConfigOverrides<Network>;
  children: ReactNode;
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
}) => {
  return (
    <WormholeCoreProvider network={network} chains={chains} config={config}>
      <Theme appearance={theme} accentColor={accentColor || 'indigo'}>
        {children}
      </Theme>
    </WormholeCoreProvider>
  );
};
