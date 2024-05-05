# @zktx.io/wormhole-kit-core

If you want to utilize only the core features of @zktx.io/wormhole-kit for your excellent UX, you can simply use @zktx.io/wormhole-kit-core.

## Getting started

Get started with @zktx.io/wormhole-kit and learn by [developer docs](https://docs.zktx.io/)

### Installation

```
npm install @zktx.io/wormhole-kit-core
yarn add @zktx.io/wormhole-kit-core
```

### Usage

First, instantiate the WhCoreProvider component.

```typescript
import { useState } from 'react';
import {
  WhCoreProvider,
} from '@zktx.io/wormhole-kit-core';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <WhCoreProvider
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
    >
      <App />
    </WhCoreProvider>
  </StrictMode>,
);
```

Next, use the WhCoreProvider context in the Modal to create unsigned transactions.

```typescript
import { useWormhole } from '@zktx.io/wormhole-kit-core';

export const WhTransferModal = () => {
  const api = useWormhole();

  const handleConfirm = async () => {
    try {
      const tx = await api.buildTransferTx({
        sender: { chain: 'Sui', address: '0x....' },
        receiver: {
          chain: 'Aptos,
          address: '0x....',
        },
        amount: '1.2',
      });
      handleUnsignedTx(tx);
    } catch (error) {
      console.error(error);
    }
  };

  return <>
    // Modal
  </>
}
```

### WhCoreProvider Props

- network: Mainnet, Testnet, and Devnet.
- chains: Algorand, Aptos, EVMs, Solana,andSui.
- config: If needed, you can customize the default configuration to, for example, support a different RPC endpoint. [link](https://docs.wormhole.com/wormhole/reference/sdk-docs#usage)
