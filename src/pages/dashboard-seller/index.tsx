import ProtectedRoute from "@/src/components/ProtectedRoute";
import dynamic from "next/dynamic";

// Dynamically import Sidebar and HomeSection without SSR
const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });
const HomeSection = dynamic(() => import("@/src/components/dashboardSeller/HomeSection"), { ssr: false });

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="flex bg-[#F9FAFB] min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <HomeSection />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
