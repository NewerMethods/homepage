
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchEnergyData } from "@/services/energyApi";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RegionalIntensityChart from "@/components/dashboard/RegionalIntensityChart";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["energyData"],
    queryFn: fetchEnergyData,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading energy data: {error.message}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <DashboardHeader />
      <SummaryCards intensityData={data.nationalIntensityData} />
      <RegionalIntensityChart regionalData={data.regionalIntensityData} />
    </motion.div>
  );
};

export default Dashboard;
