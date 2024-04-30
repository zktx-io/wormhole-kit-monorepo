import * as _algorand from '@wormhole-foundation/sdk-algorand';

import type { PlatformDefinition } from '../../types';

/** Platform and protocol definitions for Algorand */
const algorand: PlatformDefinition<'Algorand'> = {
  Address: _algorand.AlgorandAddress,
  Platform: _algorand.AlgorandPlatform,
  protocolLoaders: {
    core: () => import('@wormhole-foundation/sdk-algorand-core'),
    tokenbridge: () => import('@wormhole-foundation/sdk-algorand-tokenbridge'),
  },
};

export default algorand;
