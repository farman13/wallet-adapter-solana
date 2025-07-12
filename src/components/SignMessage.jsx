import { useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { ed25519 } from "@noble/curves/ed25519";

const SignMessage = () => {
    const inputRef = useRef();
    const { publicKey, signMessage } = useWallet();

    const signAmessage = async () => {
        if (!publicKey || !signMessage || !inputRef.current.value) return;

        try {
            const message = new TextEncoder().encode(inputRef.current.value);
            const signature = await signMessage(message);

            if (ed25519.verify(signature, message, publicKey.toBytes())) {
                alert("Signature verification successful");
            } else {
                alert("Signature invalid");
            }
        } catch (err) {
            alert("Error signing message");
            console.error(err);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-purple-700 text-center">Sign a Message</h2>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter your message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={signAmessage}
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
                >
                    Sign Message
                </button>
            </div>
        </div>
    );
};

export default SignMessage;
