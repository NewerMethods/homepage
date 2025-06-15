
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
        <div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-x-6 gap-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <h3 className="font-semibold shrink-0 text-lg">Data to Display</h3>
                <DataTypeSelector 
                    selectedType={selectedDataType}
                    onTypeChange={onDataTypeChange}
                />
            </div>

            <div className="flex items-center flex-wrap gap-4">
              {selectedDataType === 'supply' ? (
                  <>
                      <h3 className="font-semibold text-lg">Supply Controls</h3>
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
                      <h3 className="font-semibold text-lg">Demand Controls</h3>
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
        </div>
    );
};

export default DashboardControls;
