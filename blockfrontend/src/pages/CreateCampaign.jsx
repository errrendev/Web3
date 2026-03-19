import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../lib/constants";
import { useCrowdfund } from "../context/CrowdfundContext";

const Field = ({ label, placeholder, type = "text", value, onChange, textarea = false }) => (
    <label className="flex flex-col gap-1.5 flex-1">
        <span className="text-[#808191] text-[13px] font-medium">{label}</span>
        {textarea ? (
            <textarea
                required
                rows={7}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#4b5264] outline-none focus:border-[#1dc071] transition-colors resize-none"
            />
        ) : type === "file" ? (
            <input
                required
                type="file"
                accept="image/*"
                onChange={onChange}
                className="bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#1dc071] transition-colors file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2c2f32] file:text-white hover:file:bg-[#3a3d42] file:cursor-pointer cursor-pointer"
            />
        ) : (
            <input
                required
                type={type}
                step="0.01"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#4b5264] outline-none focus:border-[#1dc071] transition-colors"
            />
        )}
    </label>
);

export default function CreateCampaign() {
    const navigate = useNavigate();
    const { createCampaign } = useCrowdfund();
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        campaignTitle: "", campaignStory: "",
        campaignCategory: categories[0], requireCampaignAmount: "", imgUrl: null,
    });

    const set = (key) => (e) => {
        if (key === "imgUrl") {
            const file = e.target.files[0];
            if (file) setForm((f) => ({ ...f, imgUrl: file }));
        } else {
            setForm((f) => ({ ...f, [key]: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createCampaign(form);
            navigate("/");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-white text-2xl font-extrabold">Launch a Campaign</h1>
                <p className="text-[#808191] text-[14px] mt-1">Fill in the details below to start your crowdfunding campaign on-chain.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Row 1 */}
                <div className="flex flex-wrap gap-5">
                    <Field label="Campaign Title *" placeholder="e.g. Solar-Powered EV Stations" value={form.campaignTitle} onChange={set("campaignTitle")} />
                </div>

                {/* Story */}
                <Field
                    label="Your Story *"
                    placeholder="Describe your campaign — what are you building and how will the funds be used?"
                    value={form.campaignStory}
                    onChange={set("campaignStory")}
                    textarea
                />

                {/* Category */}
                <label className="flex flex-col gap-1.5">
                    <span className="text-[#808191] text-[13px] font-medium">Category *</span>
                    <select
                        value={form.campaignCategory}
                        onChange={set("campaignCategory")}
                        className="bg-[#1c1c24] border border-[#2c2f32] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#1dc071] transition-colors appearance-none cursor-pointer"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c} className="bg-[#1c1c24]">{c}</option>
                        ))}
                    </select>
                </label>

                {/* Row 2 */}
                <div className="flex flex-wrap gap-5">
                    <Field label="Fundraising Goal (ETH) *" placeholder="e.g. 5.00" type="number" value={form.requireCampaignAmount} onChange={set("requireCampaignAmount")} />
                </div>

                {/* Image File Input */}
                <Field label="Campaign Image *" type="file" onChange={set("imgUrl")} />

                {/* Preview */}
                {form.imgUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#2c2f32] h-56">
                        <img src={URL.createObjectURL(form.imgUrl)} alt="preview" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Info strip */}
                <div className="bg-[#8c6dfd]/10 border border-[#8c6dfd]/25 rounded-xl px-4 py-3 text-[13px] text-[#808191]">
                    <span className="text-[#8c6dfd] font-semibold">Note: </span>
                    Once submitted, your campaign is recorded on-chain and cannot be edited.
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="self-center w-full sm:w-auto px-12 py-3 rounded-xl bg-[#1dc071] text-white font-bold text-[15px] hover:bg-[#17a85e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {submitting ? "Submitting..." : "Submit Campaign"}
                </button>
            </form>
        </div>
    );
}
