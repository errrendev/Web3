import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCampaigns } from "../lib/constants";
import CampaignCard from "../components/CampaignCard";

const CATEGORIES = ["All", "Technology", "Art & Creative", "Health & Medical", "Education", "Environment", "Community"];

export default function Home() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTag, setActiveTag] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setCampaigns(dummyCampaigns);
            setLoading(false);
        }, 900);
    }, []);

    const filtered = campaigns.filter((c) => {
        const matchTag = activeTag === "All" || c.category === activeTag;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchTag && matchSearch;
    });

    const totalRaised = campaigns.reduce((s, c) => s + parseFloat(c.amountCollected || 0), 0).toFixed(1);

    return (
        <div className="flex flex-col gap-8">

            {/* ── Hero ── */}
            <div className="rounded-2xl bg-[#1c1c24] border border-[#2c2f32] p-8 relative overflow-hidden">
                {/* Glow blob */}
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#1dc071] opacity-10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#8c6dfd] opacity-10 blur-3xl pointer-events-none" />

                <span className="inline-flex items-center gap-2 text-[#1dc071] text-[12px] font-semibold bg-[#1dc071]/10 border border-[#1dc071]/20 px-3 py-1 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1dc071] animate-pulse" />
                    Powered by Ethereum Smart Contracts
                </span>

                <h1 className="text-white text-4xl font-extrabold leading-tight mb-3">
                    Fund the Future,{" "}
                    <span className="text-[#1dc071]">On-Chain.</span>
                </h1>
                <p className="text-[#808191] text-[15px] max-w-xl mb-6 leading-relaxed">
                    Launch and back decentralized projects with full on-chain transparency. Every transaction is verifiable, every goal is immutable.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-8">
                    {[
                        { label: "Active Campaigns", value: campaigns.length },
                        { label: "Total ETH Raised", value: `${totalRaised} ETH` },
                        { label: "Backed by Community", value: "100%" },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="text-white text-2xl font-extrabold">{s.value}</p>
                            <p className="text-[#808191] text-[13px]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Category pills ── */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTag(cat)}
                        className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-150 cursor-pointer
              ${activeTag === cat
                                ? "bg-[#1dc071] text-white border-[#1dc071]"
                                : "bg-transparent text-[#808191] border-[#2c2f32] hover:border-[#1dc071] hover:text-[#1dc071]"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Search ── */}
            <div className="flex items-center gap-2 bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-2.5 focus-within:border-[#1dc071] transition-colors">
                <svg className="w-4 h-4 text-[#808191] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search campaigns by name..."
                    className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-[#4b5264]"
                />
            </div>

            {/* ── Campaign grid ── */}
            <div>
                <p className="text-white font-bold text-[16px] mb-5">
                    {activeTag === "All" ? "All Campaigns" : activeTag}{" "}
                    <span className="text-[#808191] font-normal text-[14px]">({filtered.length})</span>
                </p>

                {loading ? (
                    /* Skeleton cards */
                    <div className="flex flex-wrap gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="w-[288px] rounded-2xl bg-[#1c1c24] border border-[#2c2f32] overflow-hidden animate-pulse">
                                <div className="h-40 bg-[#2c2f32]" />
                                <div className="p-4 flex flex-col gap-3">
                                    <div className="h-4 bg-[#2c2f32] rounded w-3/4" />
                                    <div className="h-3 bg-[#2c2f32] rounded w-full" />
                                    <div className="h-1.5 bg-[#2c2f32] rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-16 h-16 rounded-full bg-[#1c1c24] border border-[#2c2f32] flex items-center justify-center text-3xl">🔍</div>
                        <p className="text-[#808191] text-[15px]">No campaigns found</p>
                        <p className="text-[#4b5264] text-[13px]">Try a different search or category</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {filtered.map((c) => (
                            <CampaignCard
                                key={c.id}
                                {...c}
                                handleClick={() => navigate(`/campaign-details/${c.id}`, { state: c })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
