import { StrictMode } from 'react';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WhProvider } from '@zktx.io/wormhole-kit';
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
    <WhProvider
      network="Testnet"
      chains={['Aptos', 'Celo', 'Polygon', 'Sui']}
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
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      />
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          defaultNetwork="testnet"
          networks={{ testnet: { url: getFullnodeUrl('testnet') } }}
        >
          <WalletProvider autoConnect>
            <App />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </WhProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
