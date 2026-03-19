const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="relative w-20 h-20 mb-6">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#2c2f32] border-t-[#4acd8d] animate-spin" />
                {/* Inner pulse */}
                <div className="absolute inset-3 rounded-full bg-[#4acd8d] opacity-20 animate-ping" />
                <div className="absolute inset-3 rounded-full bg-[#4acd8d] opacity-30" />
            </div>
            <p className="font-epilogue font-bold text-[20px] text-white">{message}</p>
            <p className="font-epilogue text-[13px] text-[#808191] mt-2">
                Please wait...
            </p>
        </div>
    );
};

export default Loader;
