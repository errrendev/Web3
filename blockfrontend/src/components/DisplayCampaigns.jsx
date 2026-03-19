import { useNavigate } from "react-router-dom";
import CampaignCard from "./CampaignCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.id}`, { state: campaign });
    };

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                {title} ({campaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <div className="flex flex-col w-full items-center justify-center mt-10">
                        <div className="w-12 h-12 rounded-full border-4 border-[#3a3a43] border-t-[#4acd8d] animate-spin mb-4" />
                        <p className="font-epilogue text-[#808191]">Loading campaigns...</p>
                    </div>
                )}

                {!isLoading && campaigns.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full mt-10">
                        <div className="w-24 h-24 rounded-full bg-[#1c1c24] flex items-center justify-center text-5xl mb-4">
                            🎯
                        </div>
                        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                            No campaigns found
                        </p>
                        <p className="font-epilogue font-normal text-[12px] text-[#4b5264] mt-1">
                            Be the first to create a campaign!
                        </p>
                    </div>
                )}

                {!isLoading &&
                    campaigns.length > 0 &&
                    campaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.id || campaign.title}
                            {...campaign}
                            handleClick={() => handleNavigate(campaign)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DisplayCampaigns;
