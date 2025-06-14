
import React from 'react';
import type { TechnologyType, Metric, DemandSectorType } from '@/types';
import MetricSelector from './MetricSelector';
import TechnologySelector from './TechnologySelector';
import DemandSectorSelector from './DemandSectorSelector';

interface DashboardControlsProps {
  selectedMetrics: Metric[];
  setSelectedMetrics: (metrics: Metric[]) => void;
  selectedTechnologies: TechnologyType[];
  setSelectedTechnologies: (techs: TechnologyType[]) => void;
  selectedDemandSectors: DemandSectorType[];
  setSelectedDemandSectors: (sectors: DemandSectorType[]) => void;
}

const DashboardControls = ({
    selectedMetrics,
    setSelectedMetrics,
    selectedTechnologies,
    setSelectedTechnologies,
    selectedDemandSectors,
    setSelectedDemandSectors,
}: DashboardControlsProps) => {
    return (
        <div className="flex flex-wrap gap-4">
            <MetricSelector 
                selectedMetrics={selectedMetrics}
                onMetricChange={setSelectedMetrics}
            />
            <TechnologySelector
                selectedTechnologies={selectedTechnologies}
                onTechnologyChange={setSelectedTechnologies}
            />
            <DemandSectorSelector
                selectedSectors={selectedDemandSectors}
                onSectorChange={setSelectedDemandSectors}
            />
        </div>
    );
};

export default DashboardControls;
