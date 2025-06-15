import React from 'react';
import type { TechnologyType, Metric, DemandSectorType, FuelType } from '@/types';
import MetricSelector from './MetricSelector';
import TechnologySelector from './TechnologySelector';
import DemandSectorSelector from './DemandSectorSelector';
import FuelSelector from './FuelSelector';
import DataTypeSelector from './DataTypeSelector';

type DataType = 'supply' | 'demand';

interface DashboardControlsProps {
  selectedDataType: DataType;
  onDataTypeChange: (type: DataType) => void;
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
    selectedDataType,
    onDataTypeChange,
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
        <div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-4 p-4 border rounded-lg">
            <DataTypeSelector 
                selectedType={selectedDataType}
                onTypeChange={onDataTypeChange}
            />

            {selectedDataType === 'supply' ? (
                <>
                    <MetricSelector 
                        selectedMetrics={selectedMetrics}
                        onMetricChange={setSelectedMetrics}
                    />
                    <TechnologySelector
                        selectedTechnologies={selectedTechnologies}
                        onTechnologyChange={setSelectedTechnologies}
                    />
                </>
            ) : (
                <>
                    <DemandSectorSelector
                        selectedSectors={selectedDemandSectors}
                        onSectorChange={setSelectedDemandSectors}
                    />
                    <FuelSelector
                        selectedFuels={selectedFuels}
                        onFuelChange={setSelectedFuels}
                    />
                </>
            )}
        </div>
    );
};

export default DashboardControls;
