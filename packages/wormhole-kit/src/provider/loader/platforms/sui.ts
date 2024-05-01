import * as _sui from '@wormhole-foundation/sdk-sui';

import type { IPlatformDefinition } from '../../types';

/** Platform and protocol definitions for Sui */
const sui: IPlatformDefinition<'Sui'> = {
  Address: _sui.SuiAddress,
  Platform: _sui.SuiPlatform,
  protocolLoaders: {
    core: () => import('@wormhole-foundation/sdk-sui-core'),
    tokenbridge: () => import('@wormhole-foundation/sdk-sui-tokenbridge'),
  },
  getChain: (n, c) => new _sui.SuiChain(c, new _sui.SuiPlatform(n)),
};
export default sui;
