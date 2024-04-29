import { AlgorandAddress } from '@wormhole-foundation/sdk-algorand';
import { AptosAddress } from '@wormhole-foundation/sdk-aptos';
import { UniversalAddress } from '@wormhole-foundation/sdk-connect';
import { EvmAddress } from '@wormhole-foundation/sdk-evm';
import { SolanaAddress } from '@wormhole-foundation/sdk-solana';
import { SuiAddress } from '@wormhole-foundation/sdk-sui';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const getAddress = (
  chain: Chain,
  address: string,
): AlgorandAddress | AptosAddress | EvmAddress | SolanaAddress | SuiAddress => {
  try {
    switch (chain) {
      case 'Algorand':
        return new AlgorandAddress(address);
      case 'Aptos':
        return new AptosAddress(new UniversalAddress(address, 'hex'));
      case 'Solana':
        return new SolanaAddress(new UniversalAddress(address, 'base58'));
      case 'Sui':
        return new SuiAddress(new UniversalAddress(address, 'hex'));
      case 'Celo':
      case 'Ethereum':
      case 'Klaytn':
        // TODO
        return new EvmAddress(new UniversalAddress(address, 'hex'));
      default:
        break;
    }
    throw new Error(`${chain} is not support`);
  } catch (error) {
    throw new Error(`getAddress : ${error}`);
  }
};
