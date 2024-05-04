import { StrictMode } from 'react';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WormholeProvider } from '@zktx.io/wormhole-kit';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
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
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          defaultNetwork="testnet"
          networks={{ testnet: { url: getFullnodeUrl('testnet') } }}
        >
          <WalletProvider autoConnect>
            <SnackbarProvider
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            />
            <App />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </WormholeProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
