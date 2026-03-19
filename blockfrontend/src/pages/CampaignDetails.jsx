import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { daysLeft, calculateBarPercentage } from "../lib/utils";

const DUMMY_DONATORS = [
    { addr: "0xABc1...2345", amount: "0.5" },
    { addr: "0xDEf2...6789", amount: "1.2" },
    { addr: "0xGHi3...1011", amount: "0.3" },
];

export default function CampaignDetails() {
    const { state: c } = useLocation();
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [donators, setDonators] = useState(DUMMY_DONATORS);

    if (!c) return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-[#808191] text-lg">Campaign not found.</p>
            <button onClick={() => navigate("/")} className="px-6 py-2 bg-[#1dc071] text-white rounded-xl font-semibold text-sm hover:bg-[#17a85e]">
                ← Back Home
            </button>
        </div>
    );

    const days = daysLeft(c.deadline);
    const pct = calculateBarPercentage(c.target, c.amountCollected);

    return (
        <div className="flex flex-col gap-10">

            {/* Back */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-[#808191] text-[13px] hover:text-white transition-colors w-fit"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to campaigns
            </button>

            {/* Top section */}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Left — image + progress */}
                <div className="flex-1 flex flex-col gap-3">
                    <div className="rounded-2xl overflow-hidden h-[380px] border border-[#2c2f32]">
                        <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="h-2 bg-[#2c2f32] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1dc071] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[#808191] text-[13px] text-right">{pct}% funded</p>
                </div>

                {/* Right — stats */}
                <div className="flex lg:flex-col flex-row flex-wrap gap-4">
                    {[
                        { label: "Days Left", value: days },
                        { label: `Raised of ${c.target} ETH`, value: c.amountCollected },
                        { label: "Total Backers", value: donators.length },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#1c1c24] border border-[#2c2f32] rounded-2xl px-6 py-4 flex flex-col items-center min-w-[130px]">
                            <span className="text-white font-extrabold text-[26px]">{stat.value}</span>
                            <span className="text-[#808191] text-[12px] text-center mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col lg:flex-row gap-10">

                {/* Creator + Story + Donators */}
                <div className="flex-[2] flex flex-col gap-8">

                    {/* Creator */}
                    <div>
                        <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-4">Creator</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-[#1dc071] flex items-center justify-center font-bold text-white text-[14px] shrink-0">
                                {c.owner?.slice(2, 4).toUpperCase() || "0X"}
                            </div>
                            <div>
                                <p className="text-white text-[14px] font-semibold break-all">{c.owner}</p>
                                <p className="text-[#808191] text-[12px]">Campaign Creator</p>
                            </div>
                        </div>
                    </div>

                    {/* Story */}
                    <div>
                        <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-4">Story</h4>
                        <p className="text-[#808191] text-[15px] leading-7">{c.description}</p>
                    </div>

                    {/* Donators */}
                    <div>
                        <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-4">
                            Donators <span className="text-[#808191] font-normal normal-case text-[13px]">({donators.length})</span>
                        </h4>
                        {donators.length === 0 ? (
                            <p className="text-[#808191] text-[14px]">No donators yet — be the first!</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {donators.map((d, i) => (
                                    <div key={i} className="flex justify-between items-center bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-3">
                                        <p className="text-[#808191] text-[13px]">{i + 1}. {d.addr}</p>
                                        <p className="text-[#1dc071] text-[13px] font-semibold">{d.amount} ETH</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Fund box */}
                <div className="flex-1">
                    <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-4">Back This Campaign</h4>
                    <div className="bg-[#1c1c24] border border-[#2c2f32] rounded-2xl p-6 flex flex-col gap-5">
                        <p className="text-[#808191] text-[14px] text-center">
                            Support a project you believe in — every ETH counts.
                        </p>
                        <input
                            type="number"
                            placeholder="ETH 0.1"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-[#13131a] border border-[#2c2f32] rounded-xl px-4 py-3 text-white text-[15px] outline-none focus:border-[#1dc071] transition-colors placeholder:text-[#4b5264] w-full"
                        />
                        <div className="bg-[#13131a] rounded-xl p-4 text-[13px] text-[#808191] leading-6">
                            Funds go directly to the campaign creator's wallet via a smart contract. No middlemen.
                        </div>
                        <button
                            onClick={() => {
                                if (!amount || parseFloat(amount) <= 0) return;
                                setDonators((prev) => [...prev, { addr: "0xYou...r", amount }]);
                                setAmount("");
                            }}
                            className="w-full py-3 rounded-xl bg-[#8c6dfd] text-white font-bold text-[15px] hover:bg-[#7a5afc] transition-colors"
                        >
                            Fund Campaign
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
