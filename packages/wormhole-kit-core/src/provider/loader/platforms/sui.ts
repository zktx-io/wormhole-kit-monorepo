import { applyChainsConfigConfigOverrides } from '@wormhole-foundation/sdk-connect';
import * as _sui from '@wormhole-foundation/sdk-sui';

import type { IPlatformDefinition } from '../../types';

/** Platform and protocol definitions for Sui */
const sui: IPlatformDefinition<'Sui'> = {
  Address: _sui.SuiAddress,
  Platform: _sui.SuiPlatform,
  protocols: {
    WormholeCore: () => import('@wormhole-foundation/sdk-sui-core'),
    TokenBridge: () => import('@wormhole-foundation/sdk-sui-tokenbridge'),
  },
  getChain: (network, chain, overrides?) =>
    new _sui.SuiChain(
      chain,
      new _sui.SuiPlatform(
        network,
        applyChainsConfigConfigOverrides(network, _sui._platform, {
          [chain]: overrides,
        }),
      ),
    ),
};
export default sui;
