import { StrictMode } from 'react';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { WhProvider } from '@zktx.io/wormhole-kit';
import { SnackbarProvider } from 'notistack';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <WhProvider
      network="Testnet"
      chains={['Sui', 'Solana', 'Aptos', 'Celo', 'Polygon']}
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
      mode="dark"
    >
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      />
      <AptosWalletAdapterProvider
        plugins={[new PetraWallet()]}
        autoConnect={true}
        onError={(error) => {
          console.log('error', error);
        }}
      >
        <App />
      </AptosWalletAdapterProvider>
    </WhProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
