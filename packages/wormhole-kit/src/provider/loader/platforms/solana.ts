import * as _solana from '@wormhole-foundation/sdk-solana';

import type { IPlatformDefinition } from '../../types';

/** Platform and protocol definitons for Solana */
const solana: IPlatformDefinition<'Solana'> = {
  Address: _solana.SolanaAddress,
  Platform: _solana.SolanaPlatform,
  protocolLoaders: {
    core: () => import('@wormhole-foundation/sdk-solana-core'),
    tokenbridge: () => import('@wormhole-foundation/sdk-solana-tokenbridge'),
    cctp: () => import('@wormhole-foundation/sdk-solana-cctp'),
  },
};
export default solana;
