# @zktx.io/wormhole-kit

**Wormhole Kit** is a React library that enables instant integration of [Wormhole](https://docs.wormhole.com/wormhole/reference/sdk-docs) into your dapp.

### Transfer
![@zktx io:wormhole-kit - transfer](https://github.com/zktx-io/wormhole-kit-monorepo/assets/57783762/f60fa88e-ded8-40d5-9174-f74d98be1ef2)

### Redeem
![@zktx io:wormhole-kit - redeem](https://github.com/zktx-io/wormhole-kit-monorepo/assets/57783762/e67fee28-72b6-48e0-b173-2a705ae266ab)

## Getting started

Get started with @zktx.io/wormhole-kit and learn by [developer docs](https://docs.zktx.io/)

### Installation

```
npm install @zktx.io/wormhole-kit
```
```
yarn add @zktx.io/wormhole-kit
```

If you want to customize the UI, you can simply use the core package.

```
npm install @zktx.io/wormhole-kit-core
yarn add @zktx.io/wormhole-kit-core
```

### Usage

Instantiate a **`WhProvider`** component and start showing Whormhole Transfer Button

```typescript
import { useState } from 'react';
import {
  WhProvider,
  WhTransferModal,
} from '@zktx.io/wormhole-kit';

const App = () => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const handleUnsignedTx = async (unsignedTx: any): Promise<void> => {
    // To execute the transaction,
    // send the unsigned transaction to the wallet.
  };

  return (
    <WhProvider
      network="Testnet"
      chains={['Aptos', 'Celo', 'Polygon', 'Sui']}
      config={
        {
          chains: {
            Ethereum: {
              rpc: 'https://eth-goerli.public.blastapi.io',
            },
            Polygon: {
              rpc: 'https://polygon-mumbai.api.onfinality.io/public',
            },
          },
        }
      }
      mode="dark"
    >
      <button
        onClick={ () => {setOpen(true);} }
      >
        Transfer
      </button>
      <WhTransferModal
        chain="Sui"
        address={address}
        handleUnsignedTx={handleUnsignedTx}
        open={open}
        setOpen={setOpen}
      />
    </ WhProvider>
  )
}
```
