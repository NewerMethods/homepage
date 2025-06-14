
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type DataType = 'supply' | 'demand';

interface DataTypeSelectorProps {
  selectedType: DataType;
  onTypeChange: (type: DataType) => void;
}

const DataTypeSelector = ({ selectedType, onTypeChange }: DataTypeSelectorProps) => {
  const handleValueChange = (value: string) => {
    if (value) {
      onTypeChange(value as DataType);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={selectedType}
      onValueChange={handleValueChange}
      aria-label="Select data type"
      className="w-full sm:w-auto"
    >
      <ToggleGroupItem value="supply" aria-label="Select supply" className="w-1/2 sm:w-auto">
        Supply
      </ToggleGroupItem>
      <ToggleGroupItem value="demand" aria-label="Select demand" className="w-1/2 sm:w-auto">
        Demand
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default DataTypeSelector;
