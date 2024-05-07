import algorand from './algorand';
import aptos from './aptos';
import evm from './evm';
import sui from './sui';
import { EVMs } from './utils';

import type { IPlatformDefinition } from '../types';
import type { Chain, Platform } from '@wormhole-foundation/sdk-connect';

type PlatformLoader<P extends Platform> = () => Promise<IPlatformDefinition<P>>;

const load = async (
  loader: PlatformLoader<any>,
): Promise<IPlatformDefinition<Platform>> => {
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
  chains: Chain[],
): Promise<IPlatformDefinition<Platform>[]> => {
  const platforms: IPlatformDefinition<Platform>[] = [];
  try {
    for (const chain of chains) {
      switch (chain) {
        case 'Algorand':
          platforms.push(await load(algorand));
          break;
        case 'Aptos':
          platforms.push(await load(aptos));
          break;
        case 'Sui':
          platforms.push(await load(sui));
          break;
        default:
          EVMs.includes(chain) && platforms.push(await load(evm));
      }
    }
    return platforms;
  } catch (error) {
    throw new Error(`getPlatforms : ${error}`);
  }
};
