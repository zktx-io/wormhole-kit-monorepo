import * as _sui from '@wormhole-foundation/sdk-sui';

import type { PlatformDefinition } from '../../types';

/** Platform and protocol definitions for Sui */
const sui: PlatformDefinition<'Sui'> = {
  Address: _sui.SuiAddress,
  Platform: _sui.SuiPlatform,
  protocolLoaders: {
    core: () => import('@wormhole-foundation/sdk-sui-core'),
    tokenbridge: () => import('@wormhole-foundation/sdk-sui-tokenbridge'),
  },
};
export default sui;
