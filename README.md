# @zktx.io/wormhole-kit
@zktx.io/wormhole-kit is a React library that enables you to integrate Wormhole into your dApp instantly.
![@zktx io:wormhole-kit](https://github.com/zktx-io/wormhole-kit-monorepo/assets/57783762/71b9694d-5225-4489-acc4-56b195db108a)
## Getting started
Get started with @zktx.io/wormhole-kit and learn by [developer docs](https://docs.zktx.io/)
### Installation
```
npm install @zktx.io/wormhole-kit
yarn add @zktx.io/wormhole-kit
```
If you want to customize the UI, you can simply use the core package.
```
npm install @zktx.io/wormhole-kit-core
yarn add @zktx.io/wormhole-kit-core
```
### Usage
Instantiate a WormholeProvider component and start showing Whormhole Transfer Button
```typescript
import { useState } from 'react';
import {
  WormholeProvider,
  WhRedeemButton,
  WhTransferButton,
} from '@zktx.io/wormhole-kit';

const App = () => {
  const [account, setAccount] = useState<string | undefined>(undefined);

  const handleUnsignedTx = async (unsignedTx: string): Promise<void> => {
    // Sign and Send Transaction
  };

  return (
    <WormholeProvider
      network="Testnet"
      chains={['Aptos', 'Solana', 'Celo', 'Polygon', 'Solana', 'Sui']}
      config={{
        chains: {
          Ethereum: {
            rpc: 'https://eth-goerli.public.blastapi.io',
          },
          Polygon: {
            rpc: 'https://polygon-mumbai.api.onfinality.io/public',
          },
        },
      }}
      theme="dark"
    >
      <WhTransferButton
        chain="Sui"
        address={address}
        handleUnsignedTx={handleUnsignedTx}
      />
    </ WormholeProvider>
  )
}
```
