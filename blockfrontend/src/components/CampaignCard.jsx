import { useNavigate } from "react-router-dom";
import { daysLeft, calculateBarPercentage } from "../lib/utils";

export default function CampaignCard({ id, owner, title, description, target, deadline, amountCollected, image, handleClick }) {
    const days = daysLeft(deadline);
    const pct = calculateBarPercentage(target, amountCollected);

    return (
        <div
            onClick={handleClick}
            className="w-[288px] rounded-2xl bg-[#1c1c24] border border-[#2c2f32] overflow-hidden cursor-pointer hover:border-[#1dc071] hover:-translate-y-1 transition-all duration-200"
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c24] to-transparent" />
                <span className="absolute top-3 left-3 bg-[#1dc071] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Blockchain
                </span>
                <span className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {days}d left
                </span>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3">
                <div>
                    <h3 className="text-white font-bold text-[15px] truncate">{title}</h3>
                    <p className="text-[#808191] text-[12px] truncate mt-0.5">{description}</p>
                </div>

                {/* Progress */}
                <div>
                    <div className="h-1.5 w-full bg-[#2c2f32] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#1dc071] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-[12px]">
                        <div>
                            <p className="text-white font-semibold">{amountCollected} MATIC</p>
                            <p className="text-[#808191]">of {target} MATIC</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-semibold">{days}</p>
                            <p className="text-[#808191]">Days Left</p>
                        </div>
                    </div>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#2c2f32]">
                    <div className="w-7 h-7 rounded-full bg-[#1dc071] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                        {owner?.slice(2, 4).toUpperCase() || "0X"}
                    </div>
                    <p className="text-[#808191] text-[11px] truncate">
                        by <span className="text-[#b2b3bd]">{owner ? `${owner.slice(0, 8)}...${owner.slice(-4)}` : "Unknown"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
