import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {
    const inputRef = useRef();
    const wallet = useWallet();
    const { connection } = useConnection();

    const sendAirdrop = async () => {
        const amount = parseFloat(inputRef.current.value);
        if (!wallet.publicKey) return alert("Please connect your wallet.");
        if (isNaN(amount) || amount <= 0) return alert("Enter valid amount.");

        try {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            alert(`Airdropped ${amount} SOL!`);
        } catch (err) {
            console.error(err);
            alert("Airdrop failed.");
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-purple-700 text-center">Airdrop SOL</h2>
            <input
                ref={inputRef}
                type="number"
                placeholder="Amount in SOL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
                onClick={sendAirdrop}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
                Airdrop
            </button>
        </div>
    );
};

export default Airdrop;
