import { applyChainsConfigConfigOverrides } from '@wormhole-foundation/sdk-connect';
import * as _solana from '@wormhole-foundation/sdk-solana';

import type { IPlatformDefinition } from '../../types';

/** Platform and protocol definitons for Solana */
const solana: IPlatformDefinition<typeof _solana._platform> = {
  Address: _solana.SolanaAddress,
  Platform: _solana.SolanaPlatform,
  protocols: {
    WormholeCore: () => import('@wormhole-foundation/sdk-solana-core'),
    TokenBridge: () => import('@wormhole-foundation/sdk-solana-tokenbridge'),
    CircleBridge: () => import('@wormhole-foundation/sdk-solana-cctp'),
  },
  getChain: (network, chain, overrides?) =>
    new _solana.SolanaChain(
      chain,
      new _solana.SolanaPlatform(
        network,
        applyChainsConfigConfigOverrides(network, _solana._platform, {
          [chain]: overrides,
        }),
      ),
    ),
};

export default solana;
