
import React from 'react';
import type { TechnologyType, Metric, DemandSectorType, FuelType } from '@/types';
import MetricSelector from './MetricSelector';
import TechnologySelector from './TechnologySelector';
import DemandSectorSelector from './DemandSectorSelector';
import FuelSelector from './FuelSelector';

interface DashboardControlsProps {
  selectedMetrics: Metric[];
  setSelectedMetrics: (metrics: Metric[]) => void;
  selectedTechnologies: TechnologyType[];
  setSelectedTechnologies: (techs: TechnologyType[]) => void;
  selectedDemandSectors: DemandSectorType[];
  setSelectedDemandSectors: (sectors: DemandSectorType[]) => void;
  selectedFuels: FuelType[];
  setSelectedFuels: (fuels: FuelType[]) => void;
}

const DashboardControls = ({
    selectedMetrics,
    setSelectedMetrics,
    selectedTechnologies,
    setSelectedTechnologies,
    selectedDemandSectors,
    setSelectedDemandSectors,
    selectedFuels,
    setSelectedFuels,
}: DashboardControlsProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-center md:text-left">Supply Controls</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <MetricSelector 
                        selectedMetrics={selectedMetrics}
                        onMetricChange={setSelectedMetrics}
                    />
                    <TechnologySelector
                        selectedTechnologies={selectedTechnologies}
                        onTechnologyChange={setSelectedTechnologies}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-center md:text-left">Demand Controls</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <DemandSectorSelector
                        selectedSectors={selectedDemandSectors}
                        onSectorChange={setSelectedDemandSectors}
                    />
                    <FuelSelector
                        selectedFuels={selectedFuels}
                        onFuelChange={setSelectedFuels}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardControls;
