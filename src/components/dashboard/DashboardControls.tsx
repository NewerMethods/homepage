
import React from 'react';
import type { TechnologyType, Metric } from '@/types';
import MetricSelector from './MetricSelector';
import TechnologySelector from './TechnologySelector';

interface DashboardControlsProps {
  selectedMetrics: Metric[];
  setSelectedMetrics: (metrics: Metric[]) => void;
  selectedTechnologies: TechnologyType[];
  setSelectedTechnologies: (techs: TechnologyType[]) => void;
}

const DashboardControls = ({
    selectedMetrics,
    setSelectedMetrics,
    selectedTechnologies,
    setSelectedTechnologies
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
        </div>
    );
};

export default DashboardControls;
