import type { IWhPlatform } from '../../types';
import type {
  Chain,
  Network,
  TokenBridge,
} from '@wormhole-foundation/sdk-connect';

export const getTokenBridge = async (
  chain: Chain,
  platforms: { [key: string]: IWhPlatform },
): Promise<TokenBridge<Network>> => {
  const platform = platforms[chain];
  return platform.getProtocol('TokenBridge', (platform as any).getRpc(chain));
};
