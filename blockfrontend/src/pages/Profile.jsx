import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCampaigns } from "../lib/constants";
import { useCrowdfund } from "../context/CrowdfundContext";
import CampaignCard from "../components/CampaignCard";
import { truncateAddress } from "../lib/utils";
import ConnectWalletButton from "../components/ConnectWalletButton";

export default function Profile() {
    const navigate = useNavigate();
    const { address } = useCrowdfund();
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if (address) setCampaigns(dummyCampaigns.slice(0, 2));
            setLoading(false);
        }, 700);
    }, [address]);

    /* ── Not connected ── */
    if (!address) return (
        <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-full bg-[#1c1c24] border border-[#2c2f32] flex items-center justify-center text-4xl">👛</div>
            <div className="text-center">
                <h2 className="text-white font-bold text-xl">Wallet Not Connected</h2>
                <p className="text-[#808191] text-[14px] mt-1 max-w-xs">Connect your MetaMask to view your profile and campaigns.</p>
            </div>
            <ConnectWalletButton />
        </div>
    );

    const totalRaised = campaigns.reduce((s, c) => s + parseFloat(c.amountCollected || 0), 0).toFixed(2);

    return (
        <div className="flex flex-col gap-8">

            {/* Profile card */}
            <div className="bg-[#1c1c24] border border-[#2c2f32] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1dc071] to-[#8c6dfd] flex items-center justify-center text-3xl font-extrabold text-white">
                        {address.slice(2, 4).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[#1dc071] border-2 border-[#1c1c24] rounded-full" />
                </div>

                {/* Name + address */}
                <div className="flex flex-col gap-0.5 text-center sm:text-left">
                    <h2 className="text-white font-bold text-lg">{truncateAddress(address)}</h2>
                    <p className="text-[#808191] text-[13px]">Ethereum Wallet</p>
                    <span className="inline-flex items-center gap-1.5 text-[#1dc071] text-[12px] font-semibold mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#1dc071] animate-pulse" />
                        Connected
                    </span>
                </div>

                {/* Stats */}
                <div className="sm:ml-auto flex gap-4">
                    {[
                        { label: "My Campaigns", value: campaigns.length },
                        { label: "MATIC Raised", value: `${totalRaised} MATIC` },
                    ].map((s) => (
                        <div key={s.label} className="bg-[#13131a] border border-[#2c2f32] rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px]">
                            <span className="text-white font-extrabold text-xl">{s.value}</span>
                            <span className="text-[#808191] text-[12px] mt-0.5">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create CTA */}
            <div className="bg-[#1c1c24] border border-[#8c6dfd]/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-white font-bold text-[16px]">Start a New Campaign</h3>
                    <p className="text-[#808191] text-[13px] mt-0.5">Have a project idea? Fund it on-chain in minutes.</p>
                </div>
                <button
                    onClick={() => navigate("/create-campaign")}
                    className="px-6 py-2.5 rounded-xl bg-[#8c6dfd] text-white font-semibold text-[14px] hover:bg-[#7a5afc] transition-colors shrink-0"
                >
                    + Create Campaign
                </button>
            </div>

            {/* My campaigns */}
            <div>
                <h3 className="text-white font-bold text-[16px] mb-5">
                    My Campaigns <span className="text-[#808191] font-normal text-[14px]">({campaigns.length})</span>
                </h3>
                {loading ? (
                    <div className="flex gap-6">
                        {[1, 2].map((n) => (
                            <div key={n} className="w-[288px] rounded-2xl bg-[#1c1c24] border border-[#2c2f32] overflow-hidden animate-pulse">
                                <div className="h-40 bg-[#2c2f32]" />
                                <div className="p-4 flex flex-col gap-3">
                                    <div className="h-4 bg-[#2c2f32] rounded w-3/4" />
                                    <div className="h-3 bg-[#2c2f32] rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : campaigns.length === 0 ? (
                    <p className="text-[#808191] text-[14px]">You haven't created any campaigns yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {campaigns.map((cam) => (
                            <CampaignCard
                                key={cam.id}
                                {...cam}
                                handleClick={() => navigate(`/campaign-details/${cam.id}`, { state: cam })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
