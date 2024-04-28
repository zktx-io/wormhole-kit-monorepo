import { AlgorandAddress } from '@wormhole-foundation/sdk-algorand';
import { AptosAddress } from '@wormhole-foundation/sdk-aptos';
import { EvmAddress } from '@wormhole-foundation/sdk-evm';
import { SolanaAddress } from '@wormhole-foundation/sdk-solana';
import { SuiAddress } from '@wormhole-foundation/sdk-sui';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const getAddress = (
  chain: Chain,
  address: string,
): AlgorandAddress | AptosAddress | EvmAddress | SolanaAddress | SuiAddress => {
  switch (chain) {
    case 'Algorand':
      return new AlgorandAddress(address);
    case 'Aptos':
      return new AptosAddress(address);
    case 'Solana':
      return new SolanaAddress(address);
    case 'Sui':
      return new SuiAddress(address);
    case 'Celo':
    case 'Ethereum':
    case 'Klaytn':
      return new EvmAddress(address);
    default:
      break;
  }
  throw new Error();
};
