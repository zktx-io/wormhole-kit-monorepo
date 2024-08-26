import { useEffect, useState } from 'react';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

import type { Signer } from '@solana/web3.js';
import type { IUnsignedTx } from '@zktx.io/wormhole-kit';

import './App.css';

function App() {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions } = useWallet();

  const [address, setAddress] = useState<string | undefined>(undefined);

  const handleUnsignedTxs = async (
    unsignedTxs: IUnsignedTx[],
  ): Promise<void> => {
    try {
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const txs = unsignedTxs.map(({ signers, transaction }) => {
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;
        return { signers, transaction };
      });

      if (signAllTransactions) {
        const signedTxs = await signAllTransactions(
          txs.map((tx) => tx.transaction),
        );
        for (let i = 0; i < signedTxs.length; i++) {
          const signedTx = signedTxs[i];
          const signers: Signer[] | undefined =
            txs[i].signers &&
            (txs[i].signers as any[]).map((item) => {
              return {
                publicKey: new PublicKey(item._keypair.publicKey),
                secretKey: item._keypair.secretKey,
              };
            });
          signers && signedTx.partialSign(...signers);
          const signature = await connection.sendRawTransaction(
            signedTx.serialize(),
            {
              minContextSlot,
              // skipPreflight: true,
            },
          );
          enqueueSnackbar(signature, {
            variant: 'success',
          });
        }
      }
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
              handleUnsignedTxs={handleUnsignedTxs}
            />
            &nbsp;
            <WhRedeemModal
              chain="Solana"
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
