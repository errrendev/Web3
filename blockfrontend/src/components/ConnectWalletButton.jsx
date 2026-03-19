import { useNavigate } from "react-router-dom";
import { useCrowdfund } from "../context/CrowdfundContext";


export default function ConnectWalletButton() {
    const navigate = useNavigate();
    const { address, balance, connectWallet } = useCrowdfund();


    const handleConnect = () => {
        if (address) {
            navigate("/profile");
        } else {
            connectWallet();
        }
    };

    return (
        <button
            onClick={handleConnect}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150
        ${address
                    ? "bg-[#1dc071]/10 text-[#1dc071] border border-[#1dc071]/30 hover:bg-[#1dc071]/20"
                    : "bg-[#8c6dfd] text-white hover:bg-[#7a5afc]"
                }`}
        >
            {address ? (
                <>
                    <span className="w-2 h-2 rounded-full bg-[#1dc071] animate-pulse" />
                    <span>{balance ? parseFloat(balance).toFixed(4) : "0.00"} MATIC</span>
                    <span className="opacity-50">|</span>
                    <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                </>
            ) : (
                "Connect Wallet"
            )}
        </button>
    );
}
