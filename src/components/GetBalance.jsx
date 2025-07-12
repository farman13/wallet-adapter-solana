import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const GetBalance = () => {
    const [balance, setBalance] = useState(null);
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    const fetchBalance = async () => {
        if (!publicKey) return;
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1e9);
    };

    useEffect(() => {
        fetchBalance();
    }, [connection, publicKey]);

    return (
        <div className="bg-white rounded-xl shadow p-4 text-center text-gray-800 font-medium">
            {publicKey && balance !== null && <p>Your Balance: {balance.toFixed(3)} SOL</p>}
        </div>
    );
};

export default GetBalance;
