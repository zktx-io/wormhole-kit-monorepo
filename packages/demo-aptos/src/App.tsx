import './App.css';
import { useState } from 'react';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

function App() {
  const { connect, account, signAndSubmitTransaction } = useWallet();

  const [openTransfer, setOpenTransfer] = useState<boolean>(false);
  const [openRedeem, setOpenRedeem] = useState<boolean>(false);

  const handleUnsignedTx = async (unsignedTx: any): Promise<void> => {
    try {
      if (account) {
        const response = await signAndSubmitTransaction({
          data: {
            function: unsignedTx.function,
            typeArguments: unsignedTx.type_arguments,
            functionArguments: unsignedTx.arguments,
          },
        });
        enqueueSnackbar(response.hash, {
          variant: 'success',
        });
      }
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
        <h1>Aptos Example</h1>
        {!account ? (
          <button onClick={() => connect('Petra' as any)}>Connect</button>
        ) : (
          <span>
            <button onClick={() => setOpenTransfer(true)}>Transfer</button>
            &nbsp;
            <button onClick={() => setOpenRedeem(true)}>Redeem</button>
          </span>
        )}
        <h2>@zktx.io/wormhole-kit</h2>
        {account && (
          <>
            <WhTransferModal
              chain="Aptos"
              token={'0x1::aptos_coin::AptosCoin'}
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
              open={openTransfer}
              setOpen={setOpenTransfer}
            />
            <WhRedeemModal
              chain="Aptos"
              address={account.address}
              handleUnsignedTx={handleUnsignedTx}
              open={openRedeem}
              setOpen={setOpenRedeem}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
