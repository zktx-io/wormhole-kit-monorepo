import type { ReactNode } from 'react';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { WhCoreProvider } from '@zktx.io/wormhole-kit-core';

import type {
  Chain,
  ConfigOverrides,
  Network,
} from '@wormhole-foundation/sdk-connect';

export const WhProvider = ({
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
    <WhCoreProvider network={network} chains={chains} config={config}>
      <Theme appearance={theme} accentColor={accentColor || 'indigo'}>
        {children}
      </Theme>
    </WhCoreProvider>
  );
};
