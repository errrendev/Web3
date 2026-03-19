export const dummyCampaigns = [
    {
        id: "1",
        owner: "0x1234567890abcdef1234567890abcdef12345678",
        title: "Decentralized AI Assistant",
        description: "An open-source, privacy-preserving AI assistant built on Web3.",
        target: "50",
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        amountCollected: "12",
        image: "https://images.unsplash.com/photo-1620712948622-c32ceaf08b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Technology"
    },
    {
        id: "2",
        owner: "0xabcdef1234567890abcdef1234567890abcdef12",
        title: "Clean Ocean Initiative",
        description: "Using blockchain to track and fund ocean clean-up efforts worldwide.",
        target: "100",
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        amountCollected: "85",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Environment"
    },
    {
        id: "3",
        owner: "0x7890abcdef1234567890abcdef1234567890abcd",
        title: "Web3 Coding Bootcamp",
        description: "Free coding bootcamp for underprivileged students in developing countries.",
        target: "25",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        amountCollected: "25",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Education"
    },
    {
        id: "4",
        owner: "0x2e988a38660b25901ba65c9f5411c87bee0e0b7f",
        title: "Digital Art Marketplace",
        description: "A fair and transparent marketplace for digital artists with zero gas fees.",
        target: "10",
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        amountCollected: "1",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Art & Creative"
    }
];

export const categories = [
    "Technology",
    "Art & Creative",
    "Health & Medical",
    "Education",
    "Environment",
    "Community"
];
