
import React from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TechnologyType, Metric } from '@/types';

interface DashboardControlsProps {
  selectedMetrics: Metric[];
  setSelectedMetrics: (metrics: Metric[]) => void;
  selectedTechnologies: TechnologyType[];
  setSelectedTechnologies: (techs: TechnologyType[]) => void;
}

const METRICS: { key: Metric; label: string }[] = [
    { key: 'electricity_generation', label: 'Electricity Generation (TWh)' },
    { key: 'installed_capacity', label: 'Installed Capacity (GW)' },
];

const TECHNOLOGIES: { key: TechnologyType; label: string }[] = [
    { key: 'solar', label: 'Solar' },
    { key: 'wind', label: 'Wind' },
    { key: 'gas', label: 'Gas' },
];

const DashboardControls = ({
    selectedMetrics,
    setSelectedMetrics,
    selectedTechnologies,
    setSelectedTechnologies
}: DashboardControlsProps) => {

    const handleMetricChange = (metric: Metric) => {
        const isSelected = selectedMetrics.includes(metric);
        if (!isSelected && selectedMetrics.length >= 2) {
            // Can't select more than 2
            return;
        }
        const newMetrics = isSelected
            ? selectedMetrics.filter(m => m !== metric)
            : [...selectedMetrics, metric];
        setSelectedMetrics(newMetrics);
    };
    
    const handleTechnologyChange = (tech: TechnologyType) => {
        const newTechs = selectedTechnologies.includes(tech)
            ? selectedTechnologies.filter(t => t !== tech)
            : [...selectedTechnologies, tech];
        setSelectedTechnologies(newTechs);
    }

    return (
        <div className="flex flex-wrap gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Metrics ({selectedMetrics.length})</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Plot Metrics (Max 2)</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {METRICS.map(({key, label}) => (
                        <DropdownMenuCheckboxItem
                            key={key}
                            checked={selectedMetrics.includes(key)}
                            disabled={!selectedMetrics.includes(key) && selectedMetrics.length >= 2}
                            onSelect={(e) => e.preventDefault()} // prevent closing menu
                            onClick={() => handleMetricChange(key)}
                        >
                            {label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Technologies ({selectedTechnologies.length})</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Technologies</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {TECHNOLOGIES.map(({key, label}) => (
                        <DropdownMenuCheckboxItem
                            key={key}
                            checked={selectedTechnologies.includes(key)}
                            onSelect={(e) => e.preventDefault()} // prevent closing menu
                            onClick={() => handleTechnologyChange(key)}
                        >
                            {label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DashboardControls;
