import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

import type { IUnsignedTx } from '@zktx.io/wormhole-kit';

import './App.css';

function App() {
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();

  const handleUnsignedTxs = (unsignedTxs: IUnsignedTx[]) => {
    try {
      const unsignedTx = unsignedTxs[0];
      unsignedTx &&
        signAndExecuteTransactionBlock(
          {
            transactionBlock: unsignedTxs[0],
          },
          {
            onError: (err) => {
              enqueueSnackbar(err.message, {
                variant: 'error',
              });
            },
            onSuccess: (data) => {
              enqueueSnackbar(data.digest, {
                variant: 'success',
              });
            },
          },
        );
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.png'} className="App-logo" alt="logo" />
        <h1>Sui Example</h1>
        {!account ? (
          <ConnectButton />
        ) : (
          <span>
            <WhTransferModal
              chain="Sui"
              token={'0x2::sui::SUI'}
              address={account.address}
              trigger={<button>Transfer</button>}
              handleUnsignedTxs={handleUnsignedTxs}
            />
            &nbsp;
            <WhRedeemModal
              chain="Sui"
              address={account.address}
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
