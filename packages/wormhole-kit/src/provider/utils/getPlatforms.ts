import { AlgorandPlatform } from '@wormhole-foundation/sdk-algorand';
import { AptosPlatform } from '@wormhole-foundation/sdk-aptos';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import { SolanaPlatform } from '@wormhole-foundation/sdk-solana';
import { SuiPlatform } from '@wormhole-foundation/sdk-sui';

import '@wormhole-foundation/sdk-algorand-core';
import '@wormhole-foundation/sdk-aptos-core';
import '@wormhole-foundation/sdk-evm-core';
import '@wormhole-foundation/sdk-solana-core';
import '@wormhole-foundation/sdk-sui-core';
import '@wormhole-foundation/sdk-algorand-tokenbridge';
import '@wormhole-foundation/sdk-aptos-tokenbridge';
import '@wormhole-foundation/sdk-evm-tokenbridge';
import '@wormhole-foundation/sdk-solana-tokenbridge';
import '@wormhole-foundation/sdk-sui-tokenbridge';

import type { IWhPlatform } from '../types';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

export const getPlatforms = (network: Network, chains: Chain[]) => {
  const platforms: {
    [key: string]: IWhPlatform;
  } = {};
  try {
    chains.forEach((chain) => {
      switch (chain) {
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
          platforms[chain] = new EvmPlatform(network);
          break;
        default:
          throw new Error(`${chain} is not support`);
      }
    });
    return platforms;
  } catch (error) {
    throw new Error(`getPlatforms : ${error}`);
  }
};
