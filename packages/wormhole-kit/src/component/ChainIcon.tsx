import { Acala } from './icons/acala';
import { Aptos } from './icons/aptos';
import { Arbitrum } from './icons/arbitrum';
import { Base } from './icons/base';
import { Bsc } from './icons/bsc';
import { Eth } from './icons/eth';
import { Injective } from './icons/injective';
import { Moonbeam } from './icons/moonbeam';
import { Optimism } from './icons/optimism';
import { Solana } from './icons/solana';
import { Sui } from './icons/sui';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const ChainIcon = ({ chain }: { chain: Chain }) => {
  return (
    <>
      {chain === 'Acala' && <Acala />}
      {chain === 'Aptos' && <Aptos />}
      {chain === 'Arbitrum' && <Arbitrum />}
      {chain === 'Base' && <Base />}
      {chain === 'Bsc' && <Bsc />}
      {chain === 'Ethereum' && <Eth />}
      {chain === 'Injective' && <Injective />}
      {chain === 'Moonbeam' && <Moonbeam />}
      {chain === 'Optimism' && <Optimism />}
      {chain === 'Solana' && <Solana />}
      {chain === 'Sui' && <Sui />}
    </>
  );
};
