import algorand from './algorand';
import aptos from './aptos';
import evm from './evm';
import solana from './solana';
import sui from './sui';

import type { IWhPlatform, PlatformDefinition } from '../types';
import type {
  Chain,
  Network,
  Platform,
} from '@wormhole-foundation/sdk-connect';

type PlatformLoader<P extends Platform> = () => Promise<PlatformDefinition<P>>;

const load = async (
  loader: PlatformLoader<any>,
): Promise<PlatformDefinition<Platform>> => {
  try {
    const platform = await loader();
    Object.values(platform.protocolLoaders).map((loaderFn) => loaderFn());
    return platform;
  } catch (e) {
    console.error('Failed to load required packages', e);
    throw e;
  }
};

export const loadPlotforms = async (
  network: Network,
  chains: Chain[],
): Promise<{
  [key: string]: IWhPlatform;
}> => {
  const platforms: {
    [key: string]: IWhPlatform;
  } = {};
  try {
    for (const chain of chains) {
      switch (chain) {
        case 'Algorand':
          platforms[chain] = new (await load(algorand)).Platform(network);
          break;
        case 'Aptos':
          platforms[chain] = new (await load(aptos)).Platform(network);
          break;
        case 'Solana':
          platforms[chain] = new (await load(solana)).Platform(network);
          break;
        case 'Sui':
          platforms[chain] = new (await load(sui)).Platform(network);
          break;
        case 'Celo':
        case 'Ethereum':
        case 'Klaytn':
          platforms[chain] = new (await load(evm)).Platform(network);
          break;
        default:
          throw new Error(`${chain} is not support`);
      }
    }
    return platforms;
  } catch (error) {
    throw new Error(`getPlatforms : ${error}`);
  }
};
