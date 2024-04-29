import { AlgorandPlatform } from '@wormhole-foundation/sdk-algorand';
import { AptosPlatform } from '@wormhole-foundation/sdk-aptos';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import { SolanaPlatform } from '@wormhole-foundation/sdk-solana';
import { SuiPlatform } from '@wormhole-foundation/sdk-sui';

import type { IWhPlatform } from '../types';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

export const getPlatforms = (network: Network, chains: Chain[]) => {
  const platforms: {
    [key: string]: IWhPlatform;
  } = {};
  try {
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
          // TODO
          platforms[item] = new EvmPlatform(network);
          break;
        default:
          throw new Error(`${item} is not support chain`);
      }
    });
    return platforms;
  } catch (error) {
    throw new Error(`getPlatforms : ${error}`);
  }
};
