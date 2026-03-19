const CustomButton = ({ btnType = "button", title, handleClick, styles = "" }) => {
    return (
        <button
            type={btnType}
            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95 ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;
