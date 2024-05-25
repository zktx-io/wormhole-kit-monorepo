import { StrictMode } from 'react';

import { WhProvider } from '@zktx.io/wormhole-kit';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@mysten/dapp-kit/dist/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <WhProvider
      network="Testnet"
      chains={['Sui', 'Sepolia', 'Solana', 'Aptos', 'Celo', 'Polygon']}
      mode="dark"
    >
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      />
      <App />
    </WhProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
