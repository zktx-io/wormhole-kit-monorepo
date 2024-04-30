import * as _aptos from '@wormhole-foundation/sdk-aptos';

import type { PlatformDefinition } from '../../types';

/** Platform and protocol definitions for Aptos */
const aptos: PlatformDefinition<'Aptos'> = {
  Address: _aptos.AptosAddress,
  Platform: _aptos.AptosPlatform,
  protocolLoaders: {
    core: () => import('@wormhole-foundation/sdk-aptos-core'),
    tokenbridge: () => import('@wormhole-foundation/sdk-aptos-tokenbridge'),
  },
};

export default aptos;
