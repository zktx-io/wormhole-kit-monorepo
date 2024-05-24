import './App.css';

import { useEffect, useState } from 'react';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [address, setAddress] = useState<string | undefined>(undefined);

  const handleUnsignedTx = async (unsignedTx: any): Promise<void> => {
    try {
      const {
        context: { slot: minContextSlot },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(unsignedTx, connection, {
        minContextSlot,
      });
      enqueueSnackbar(signature, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toBase58());
    } else {
      setAddress(undefined);
    }
  }, [publicKey]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.png'} className="App-logo" alt="logo" />
        <h1>Solana Example</h1>
        {!address ? (
          <WalletMultiButton />
        ) : (
          <span>
            <WhTransferModal
              chain="Solana"
              address={address}
              trigger={<button>Transfer</button>}
              handleUnsignedTx={handleUnsignedTx}
            />
            &nbsp;
            <WhRedeemModal
              chain="Solana"
              address={address}
              trigger={<button>Redeem</button>}
              handleUnsignedTx={handleUnsignedTx}
            />
          </span>
        )}
        <h2>@zktx.io/wormhole-kit</h2>
      </header>
    </div>
  );
}

export default App;
