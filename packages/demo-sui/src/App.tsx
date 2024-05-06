import './App.css';
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { WhRedeemButton, WhTransferButton } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

function App() {
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();

  const handleUnsignedTx = async (unsignedTx: any): Promise<void> => {
    try {
      console.log(1, unsignedTx);
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
            <WhTransferButton
              chain="Sui"
              token={'0x2::sui::SUI'}
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
            />
            &nbsp;
            <WhRedeemButton
              chain="Sui"
              address={account.address}
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
