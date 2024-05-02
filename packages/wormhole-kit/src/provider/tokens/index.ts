import { mainnetTokenEntries } from './mainnet';
import { testnetTokenEntries } from './testnet';

import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

export interface ITokenInfo {
  symbol: string;
  decimals: number;
  address: string;
  wrappedKey: string;
}

export interface ITokenInfos {
  [chain: string]: {
    [token: string]: ITokenInfo;
  };
}

const mainnetTokens: ITokenInfos = {};
const testnetTokens: ITokenInfos = {};

mainnetTokenEntries.forEach((item) => {
  item[1].forEach((token) => {
    if (!mainnetTokens[item[0]]) {
      mainnetTokens[item[0]] = {};
    }
    (mainnetTokens[item[0]] as any)[token[1].address] = token[1];
  });
});

testnetTokenEntries.forEach((item) => {
  item[1].forEach((token) => {
    if (!testnetTokens[item[0]]) {
      testnetTokens[item[0]] = {};
    }
    (testnetTokens[item[0]] as any)[token[1].address] = token[1];
  });
});

export const getTokenInfo = (
  chain: Chain,
  network: Network,
  token: string,
): ITokenInfo => {
  const tokens = network === 'Mainnet' ? mainnetTokens : testnetTokens;

  if (tokens[chain]) {
    if (tokens[chain][token]) {
      return tokens[chain][token];
    }
  }

  throw new Error('getTokenInfo');
};
