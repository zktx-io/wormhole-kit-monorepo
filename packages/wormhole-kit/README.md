# @zktx.io/wormhole-kit

**Wormhole Kit** is a React library that enables instant integration of [Wormhole](https://docs.wormhole.com/wormhole/reference/sdk-docs) into your dapp.
![@zktx io:wormhole-kit](https://github.com/zktx-io/wormhole-kit-monorepo/assets/57783762/721a375a-b85b-4099-9e95-d4a9d89e12a9)

## Getting started

Get started with @zktx.io/wormhole-kit and learn by [developer docs](https://docs.zktx.io/wormhole-kit.html)

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

### WhProvider Props

- **`network`**: *Mainnet*, *Testnet*, and *Devnet*.
- **`chains`**: *Algorand*, *Aptos*, *EVMs*, *Solana*, and *Sui*.
- **`config`**: If needed, you can customize the default configuration to, for example, support a different RPC endpoint. [link](https://docs.wormhole.com/wormhole/reference/sdk-docs#usage)
- **`mode`**: Switch appearance between *light*, and *dark* modes.

### WhTransferModal Props

- **`chain`**: The name of the connected chain.
- **`address`**: The address of the connected wallet.
- **`handleUnsignedTx`**: The unsigned transaction is formatted for wallet use and forwarded.
- **`open`**: State of modal.
- **`setOpen`**: Set state of modal.


### WhRedeemModal Props

- **`chain`**: The name of the connected chain.
- **`address`**: The address of the connected wallet.
- **`handleUnsignedTx`**: The unsigned transaction is formatted for wallet use and forwarded.
- **`open`**: State of modal.
- **`setOpen`**: Set state of modal.
