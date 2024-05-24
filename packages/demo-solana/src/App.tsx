import './App.css';

import { WhRedeemModal, WhTransferModal } from '@zktx.io/wormhole-kit';
import { enqueueSnackbar } from 'notistack';

function App() {
  const handleUnsignedTx = async (unsignedTx: any): Promise<void> => {
    //
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.png'} className="App-logo" alt="logo" />
        <h1>Solana Example</h1>
        <h2>@zktx.io/wormhole-kit</h2>
      </header>
    </div>
  );
}

export default App;
