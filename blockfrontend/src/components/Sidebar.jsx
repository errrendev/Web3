import { useNavigate, useLocation, Link } from "react-router-dom";

const navItems = [
    {
        href: "/",
        label: "Home",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                <path d="M9 21V12h6v9" />
            </svg>
        ),
    },
    {
        href: "/create-campaign",
        label: "Create",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
            </svg>
        ),
    },
    {
        href: "/profile",
        label: "Profile",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center py-5 h-full gap-1">

            {/* Logo */}
            <Link to="/" className="mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1dc071] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </Link>

            {/* Nav */}
            {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                    <button
                        key={item.href}
                        onClick={() => navigate(item.href)}
                        title={item.label}
                        className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer group
              ${active
                                ? "bg-[#1dc071] text-white"
                                : "text-[#808191] hover:text-white hover:bg-[#1c1c24]"
                            }`}
                    >
                        {item.icon}

                        {/* Tooltip */}
                        <span className="absolute left-14 bg-[#1c1c24] border border-[#2c2f32] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
