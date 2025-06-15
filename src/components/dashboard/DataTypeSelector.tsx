
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DATA_TYPES } from '@/config/dashboardConfig';

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
      {DATA_TYPES.map(({ key, label }) => (
        <ToggleGroupItem key={key} value={key} aria-label={`Select ${label.toLowerCase()}`} className="w-1/2 sm:w-auto">
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default DataTypeSelector;
