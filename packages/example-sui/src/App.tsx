import './App.css';
import { ConnectButton } from '@mysten/dapp-kit';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>@zktx.io/wormhole-kit</h1>
        <h2>Sui Example</h2>
        <ConnectButton />
      </header>
    </div>
  );
}

export default App;
