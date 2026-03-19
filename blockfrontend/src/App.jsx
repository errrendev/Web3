import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CrowdfundProvider } from "./context/CrowdfundContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <CrowdfundProvider>
      <Router>
        <div className="min-h-screen bg-[#13131a] flex font-[Epilogue,sans-serif]">

          {/* Sidebar */}
          <aside className="hidden sm:flex flex-col w-[76px] shrink-0 h-screen sticky top-0 border-r border-[#2c2f32] bg-[#13131a] z-50">
            <Sidebar />
          </aside>

          {/* Main */}
          <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#13131a] border-b border-[#2c2f32] px-6 py-3">
              <Navbar />
            </header>

            {/* Page */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#2c2f32] py-4 px-6 text-center text-[12px] text-[#4b5264]">
              © 2024 FundChain · Decentralized Crowdfunding on Ethereum
            </footer>

          </div>
        </div>
      </Router>
    </CrowdfundProvider>
  );
}

export default App;
