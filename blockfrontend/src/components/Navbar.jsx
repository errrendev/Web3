import { useNavigate } from "react-router-dom";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-4">

            {/* Search bar */}
            <div className="flex items-center gap-2 bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-2 flex-1 max-w-md focus-within:border-[#1dc071]">
                <svg className="w-4 h-4 text-[#808191] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-[#4b5264]"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 ml-auto">
                {/* + icon */}
                <button
                    onClick={() => navigate("/create-campaign")}
                    className="w-9 h-9 rounded-xl bg-[#1c1c24] border border-[#2c2f32] flex items-center justify-center text-[#808191] hover:border-[#1dc071] hover:text-[#1dc071] transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {/* Wallet Button */}
                <ConnectWalletButton />
            </div>
        </div>
    );
}
