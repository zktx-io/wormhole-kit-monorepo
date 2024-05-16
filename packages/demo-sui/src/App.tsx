import './App.css';

import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

function App() {
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();

  const handleUnsignedTx = (unsignedTx: any) => {
    try {
      signAndExecuteTransactionBlock(
        {
          transactionBlock: unsignedTx,
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
              handleUnsignedTx={handleUnsignedTx}
              trigger={<button>Transfer</button>}
            />
            &nbsp;
            <WhRedeemModal
              chain="Sui"
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
              trigger={<button>Redeem</button>}
            />
          </span>
        )}
        <h2>@zktx.io/wormhole-kit</h2>
      </header>
    </div>
  );
}

export default App;
