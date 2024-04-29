import type { IWhPlatform } from '../types';
import type {
  Chain,
  Network,
  TokenBridge,
} from '@wormhole-foundation/sdk-connect';

export const getTokenBridge = async (
  chain: Chain,
  platform: IWhPlatform,
): Promise<TokenBridge<Network>> => {
  return platform.getProtocol('TokenBridge', (platform as any).getRpc(chain));
};
