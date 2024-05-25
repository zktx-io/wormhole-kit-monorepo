import { useState } from 'react';

import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

import type { IUnsignedTx } from '@zktx.io/wormhole-kit';

import './App.css';

function App() {
  const [address, setAddress] = useState<string | undefined>(undefined);

  const handleUnsignedTxs = async (unsignedTxs: IUnsignedTx[]) => {
    try {
      const provider = (window as any).ethereum;
      const chainId = await provider.request({ method: 'eth_chainId' });

      if (chainId === '0xaef3') {
        let lastHash = '';
        for (const tx of unsignedTxs) {
          delete tx.chainId;
          const hash = await provider.request({
            method: 'eth_sendTransaction',
            params: [tx],
          });
          lastHash = `${hash}`;
        }
        enqueueSnackbar(lastHash, {
          variant: 'success',
        });
      }
    } catch (error) {
      enqueueSnackbar(`${JSON.stringify(error)}`, {
        variant: 'error',
      });
    }
  };

  const handleConnect = async () => {
    const provider = (window as any).ethereum;
    if (provider) {
      try {
        const accounts: string[] = await provider.request({
          method: 'eth_requestAccounts',
        });
        accounts.length > 0 && setAddress(accounts[0]);
      } catch (error) {
        enqueueSnackbar(`${JSON.stringify(error)}`, {
          variant: 'error',
        });  
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.png'} className="App-logo" alt="logo" />
        <h1>Celo Example</h1>
        {!address ? (
          <button onClick={handleConnect}>connect</button>
        ) : (
          <span>
            <WhTransferModal
              chain="Celo"
              token="0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
              address={address}
              trigger={<button>Transfer</button>}
              handleUnsignedTxs={handleUnsignedTxs}
            />
            &nbsp;
            <WhRedeemModal
              chain="Celo"
              address={address}
              trigger={<button>Redeem</button>}
              handleUnsignedTxs={handleUnsignedTxs}
            />
          </span>
        )}
        <h2>@zktx.io/wormhole-kit</h2>
      </header>
    </div>
  );
}

export default App;

// 0x704274ed36db2abb81e400a34c33a6f28fbdfe211be18a8058756368184ee51c
