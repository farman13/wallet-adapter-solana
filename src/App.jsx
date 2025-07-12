import Airdrop from "./components/Airdrop";
import ConnectButton from "./components/ConnectButton";
import GetBalance from "./components/GetBalance";
import SendSol from "./components/SendSol";
import SignMessage from "./components/SignMEssage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Wallet buttons on top right */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <ConnectButton />
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto pt-24 px-4 space-y-10">
        <GetBalance />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Airdrop />
          <SendSol />
          <SignMessage />
        </div>
      </div>
    </div>
  );
}

export default App;
