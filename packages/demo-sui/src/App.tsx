import './App.css';
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WhRedeemButton, WhTransferButton } from '@zktx.io/wormhole-kit';

function App() {
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();

  const handleUnsignedTx = async (unsignedTx: string): Promise<void> => {
    try {
      signAndExecuteTransactionBlock(
        {
          transactionBlock: TransactionBlock.from(unsignedTx),
        },
        {
          onError: (err) => {
            //
          },
          onSuccess: (data) => {
            //
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>@zktx.io/wormhole-kit</h1>
        <h2>Sui Example</h2>
        {!account ? (
          <ConnectButton />
        ) : (
          <>
            <WhTransferButton
              chain="Sui"
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
            />
            <WhRedeemButton
              chain="Sui"
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
