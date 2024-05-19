import * as _aptos from '@wormhole-foundation/sdk-aptos';
import { applyChainsConfigConfigOverrides } from '@wormhole-foundation/sdk-connect';

import type { IPlatformDefinition } from '../../types';

/** Platform and protocol definitions for Aptos */
const aptos: IPlatformDefinition<'Aptos'> = {
  Address: _aptos.AptosAddress,
  Platform: _aptos.AptosPlatform,
  protocols: {
    WormholeCore: () => import('@wormhole-foundation/sdk-aptos-core'),
    TokenBridge: () => import('@wormhole-foundation/sdk-aptos-tokenbridge'),
  },
  getChain: (network, chain, overrides?) =>
    new _aptos.AptosChain(
      chain,
      new _aptos.AptosPlatform(
        network,
        applyChainsConfigConfigOverrides(network, _aptos._platform, {
          [chain]: overrides,
        }),
      ),
    ),
};

export default aptos;
