import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

import type { IUnsignedTx } from '@zktx.io/wormhole-kit';

import './App.css';

function App() {
  const { connect, account, signAndSubmitTransaction } = useWallet();

  const handleUnsignedTxs = async (
    unsignedTxs: IUnsignedTx[],
  ): Promise<void> => {
    try {
      if (account) {
        const unsignedTx = unsignedTxs[0];
        if (unsignedTx) {
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
        } else {
          enqueueSnackbar('Empty Transactions', {
            variant: 'error',
          });
        }
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
          <button onClick={() => connect('Petra' as any)}>Petra Wallet</button>
        ) : (
          <span>
            <WhTransferModal
              chain="Aptos"
              token={'0x1::aptos_coin::AptosCoin'}
              address={account.address}
              trigger={<button>Transfer</button>}
              handleUnsignedTxs={handleUnsignedTxs}
            />
            &nbsp;
            <WhRedeemModal
              chain="Aptos"
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
