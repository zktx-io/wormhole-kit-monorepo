import { StrictMode } from 'react';

import { WhProvider } from '@zktx.io/wormhole-kit';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wallet from './Wallet';

import '@mysten/dapp-kit/dist/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <WhProvider
      network="Testnet"
      chains={['Solana', 'Sui', 'Aptos', 'Celo', 'Polygon']}
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
      <Wallet>
        <App />
      </Wallet>
    </WhProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
