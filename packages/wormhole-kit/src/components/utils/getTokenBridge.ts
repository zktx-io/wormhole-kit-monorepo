import type { IWhChain, IWhPlatform } from '../../types';
import type { TokenBridge } from '@wormhole-foundation/sdk-connect';

export const getTokenBridge = async (
  chain: IWhChain,
  platform: IWhPlatform,
): Promise<TokenBridge<"Mainnet" | "Testnet" | "Devnet">> => {
  return platform.getProtocol('TokenBridge', platform.getRpc);
};
