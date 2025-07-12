import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useRef } from 'react';

const SendSol = () => {
    const inputRef = useRef();
    const amountRef = useRef();
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    const sendSol = async () => {
        if (!publicKey) return alert("Connect wallet first.");

        const recipient = inputRef.current.value;
        const amount = parseFloat(amountRef.current.value);
        if (!recipient || isNaN(amount)) return alert("Invalid inputs.");

        const txn = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(recipient),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        // const {
        //     context: { slot: minContextSlot },
        //     value: { blockhash, lastValidBlockHeight },
        // } = await connection.getLatestBlockhashAndContext();

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        const signature = await sendTransaction(txn, connection);
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

        alert(`Sent ${amount} SOL`);
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-purple-700 text-center">Send SOL</h2>
            <input
                type="text"
                ref={inputRef}
                placeholder="Recipient Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
                type="number"
                ref={amountRef}
                placeholder="Amount in SOL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
                onClick={sendSol}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
                Send
            </button>
        </div>
    );
};

export default SendSol;
