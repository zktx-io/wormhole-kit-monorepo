import { AlgorandPlatform } from '@wormhole-foundation/sdk-algorand';
import { AptosPlatform } from '@wormhole-foundation/sdk-aptos';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import { SolanaPlatform } from '@wormhole-foundation/sdk-solana';
import { SuiPlatform } from '@wormhole-foundation/sdk-sui';

import type { IWhChain, IWhNetwork, IWhPlatform } from '../../types';

export const getPlatform = (network: IWhNetwork, chains: IWhChain[]) => {
  const platforms: {
    [key: string]: IWhPlatform;
  } = {};
  chains.forEach((item) => {
    switch (item) {
      case 'Algorand':
        platforms['Algorand'] = new AlgorandPlatform(network);
        break;
      case 'Aptos':
        platforms['Aptos'] = new AptosPlatform(network);
        break;
      case 'Solana':
        platforms['Solana'] = new SolanaPlatform(network);
        break;
      case 'Sui':
        platforms['Sui'] = new SuiPlatform(network);
        break;
      case 'Celo':
      case 'Ethereum':
      case 'Klaytn':
        platforms[item] = new EvmPlatform(network);
        break;

      default:
        break;
    }
    throw new Error();
  });
  return platforms;
};