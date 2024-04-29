import type { IWhPlatform } from '../../types';
import type { Chain, WormholeCore } from '@wormhole-foundation/sdk-connect';

export const getWormholeCore = async (
  chain: Chain,
  platforms: { [key: string]: IWhPlatform },
): Promise<WormholeCore> => {
  const platform = platforms[chain];
  return platform.getProtocol('WormholeCore', (platform as any).getRpc(chain));
};
