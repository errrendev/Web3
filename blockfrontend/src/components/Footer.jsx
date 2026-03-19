import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-[#2c2f32] pt-10 pb-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* Brand */}
                <div className="flex flex-col gap-4 max-w-[300px]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4acd8d] to-[#1ec070] flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-[18px]">⛓</span>
                        </div>
                        <span className="font-epilogue font-bold text-[20px] text-white">
                            FundChain
                        </span>
                    </div>
                    <p className="font-epilogue text-[13px] text-[#808191] leading-relaxed">
                        A decentralized crowdfunding platform powered by Ethereum smart
                        contracts. Transparent, trustless, and borderless fundraising for
                        everyone.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-3 mt-2">
                        {["𝕏", "📘", "💬", "🔗"].map((icon, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 rounded-full bg-[#2c2f32] flex items-center justify-center cursor-pointer hover:bg-[#3a3a43] transition-colors text-sm"
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-10">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[14px] text-white mb-4">
                            Platform
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {["Campaigns", "Create", "Profile", "How it works"].map((l) => (
                                <li key={l}>
                                    <span className="font-epilogue text-[13px] text-[#808191] hover:text-[#4acd8d] cursor-pointer transition-colors">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-epilogue font-semibold text-[14px] text-white mb-4">
                            Resources
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {["Docs", "Smart Contract", "GitHub", "Roadmap"].map((l) => (
                                <li key={l}>
                                    <span className="font-epilogue text-[13px] text-[#808191] hover:text-[#4acd8d] cursor-pointer transition-colors">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-epilogue font-semibold text-[14px] text-white mb-4">
                            Legal
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
                                <li key={l}>
                                    <span className="font-epilogue text-[13px] text-[#808191] hover:text-[#4acd8d] cursor-pointer transition-colors">
                                        {l}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#2c2f32] flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-epilogue text-[12px] text-[#4b5264]">
                    © 2024 FundChain. All rights reserved. Built on Ethereum.
                </p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4acd8d] animate-pulse" />
                    <span className="font-epilogue text-[12px] text-[#4b5264]">
                        Sepolia Testnet
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
