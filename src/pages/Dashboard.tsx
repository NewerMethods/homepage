import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchEnergyData } from "@/services/energyApi";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardControls from "@/components/dashboard/DashboardControls";
import GenerationChart from "@/components/dashboard/GenerationChart";
import DemandChart from "@/components/dashboard/DemandChart";
import type { TechnologyType, Metric, DemandSectorType, FuelType } from '@/types';
import { METRICS, TECHNOLOGIES, SECTORS, FUELS } from '@/config/dashboardConfig';

type DataType = 'supply' | 'demand';

const Dashboard = () => {
  const [dataType, setDataType] = useState<DataType>('supply');
  const [selectedMetrics, setSelectedMetrics] = useState<Metric[]>([METRICS[0].key]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyType[]>(TECHNOLOGIES.map(t => t.key));
  const [selectedDemandSectors, setSelectedDemandSectors] = useState<DemandSectorType[]>(SECTORS.map(s => s.key));
  const [selectedFuels, setSelectedFuels] = useState<FuelType[]>(FUELS.map(f => f.key));

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

  const handleDataTypeChange = (type: DataType) => {
    if (type !== dataType) {
        setDataType(type);
    }
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
        selectedDataType={dataType}
        onDataTypeChange={handleDataTypeChange}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
        selectedTechnologies={selectedTechnologies}
        setSelectedTechnologies={setSelectedTechnologies}
        selectedDemandSectors={selectedDemandSectors}
        setSelectedDemandSectors={setSelectedDemandSectors}
        selectedFuels={selectedFuels}
        setSelectedFuels={setSelectedFuels}
      />
      {data && (
        <div className="space-y-8">
          {dataType === 'supply' ? (
            <GenerationChart
              data={data.supply}
              metrics={selectedMetrics}
              technologies={selectedTechnologies}
            />
          ) : (
            <DemandChart
              data={data.demand}
              sectors={selectedDemandSectors}
              fuels={selectedFuels}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
