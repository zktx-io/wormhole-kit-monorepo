import { type Chain, type PlatformLoader } from '@wormhole-foundation/sdk';
import algorand from '@wormhole-foundation/sdk/algorand';
import aptos from '@wormhole-foundation/sdk/aptos';
import cosmwasm from '@wormhole-foundation/sdk/cosmwasm';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import sui from '@wormhole-foundation/sdk/sui';

export const getPlatform = (chain: Chain): PlatformLoader<any> => {
  switch (chain) {
    case 'Algorand':
      return algorand;
    case 'Aptos':
      return aptos;
    case 'Cosmoshub':
      return cosmwasm;
    case 'Solana':
      return solana;
    case 'Sui':
      return sui;
    case 'Ethereum':
    case 'Celo':
      return evm;
    default:
      break;
  }
  throw new Error('not support chains');
};
