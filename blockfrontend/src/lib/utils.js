/**
 * Calculates the number of remaining days from a deadline string/date.
 */
export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return Math.max(0, Math.floor(remainingDays));
};

/**
 * Returns a percentage (0-100) of how much has been raised vs target.
 */
export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
    return Math.min(percentage, 100);
};

/**
 * Truncates an Ethereum address for display.
 */
export const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats a number to a fixed decimal string.
 */
export const formatEther = (value, decimals = 4) => {
    if (!value) return "0";
    return parseFloat(value).toFixed(decimals);
};
