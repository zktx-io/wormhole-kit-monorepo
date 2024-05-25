import { Acala } from './icons/acala';
import { Algorand } from './icons/algorand';
import { Aptos } from './icons/aptos';
import { Arbitrum } from './icons/arbitrum';
import { Avax } from './icons/avax';
import { Base } from './icons/base';
import { Bsc } from './icons/bsc';
import { Celo } from './icons/celo';
import { Eth } from './icons/eth';
import { Injective } from './icons/injective';
import { Moonbeam } from './icons/moonbeam';
import { Near } from './icons/near';
import { Optimism } from './icons/optimism';
import { Polygon } from './icons/polygon';
import { Sei } from './icons/sei';
import { Solana } from './icons/solana';
import { Sui } from './icons/sui';

import type { Chain } from '@zktx.io/wormhole-kit-core';

export const ChainIcon = ({ chain }: { chain: Chain }) => {
  return (
    <>
      {chain === 'Acala' && <Acala />}
      {chain === 'Algorand' && <Algorand />}
      {chain === 'Aptos' && <Aptos />}
      {chain === 'Arbitrum' && <Arbitrum />}
      {chain === 'ArbitrumSepolia' && <Arbitrum />}
      {chain === 'Avalanche' && <Avax />}
      {chain === 'Base' && <Base />}
      {chain === 'BaseSepolia' && <Base />}
      {chain === 'Bsc' && <Bsc />}
      {chain === 'Celo' && <Celo />}
      {chain === 'Ethereum' && <Eth />}
      {chain === 'Sepolia' && <Eth />}
      {chain === 'Injective' && <Injective />}
      {chain === 'Moonbeam' && <Moonbeam />}
      {chain === 'Near' && <Near />}
      {chain === 'Optimism' && <Optimism />}
      {chain === 'Polygon' && <Polygon />}
      {chain === 'PolygonSepolia' && <Polygon />}
      {chain === 'Sei' && <Sei />}
      {chain === 'Solana' && <Solana />}
      {chain === 'Sui' && <Sui />}
    </>
  );
};
