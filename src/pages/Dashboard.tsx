
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchEnergyData } from "@/services/energyApi";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardControls from "@/components/dashboard/DashboardControls";
import GenerationChart from "@/components/dashboard/GenerationChart";
import type { TechnologyType, Metric, DemandSectorType } from '@/types';

const Dashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<Metric[]>(['electricity_generation']);
  const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyType[]>(['solar', 'wind', 'gas', 'hydro']);
  const [selectedDemandSectors, setSelectedDemandSectors] = useState<DemandSectorType[]>(['heat_pumps', 'electric_vehicles', 'industry']);

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
      <DashboardControls
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        selectedTechnologies={selectedTechnologies}
        setSelectedTechnologies={setSelectedTechnologies}
        selectedDemandSectors={selectedDemandSectors}
        setSelectedDemandSectors={setSelectedDemandSectors}
      />
      {data && (
        <GenerationChart
          data={data.supply}
          metrics={selectedMetrics}
          technologies={selectedTechnologies}
        />
      )}
    </motion.div>
  );
};

export default Dashboard;
