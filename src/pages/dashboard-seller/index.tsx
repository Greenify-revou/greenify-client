import dynamic from "next/dynamic";

// Dynamically import Sidebar and HomeSection without SSR
const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });
const HomeSection = dynamic(() => import("@/src/components/dashboardSeller/HomeSection"), { ssr: false });

const Dashboard = () => {
  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <HomeSection />
      </div>
    </div>
  );
};

export default Dashboard;
