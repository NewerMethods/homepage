import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Metric } from '@/types';
import { METRICS } from '@/config/dashboardConfig';

interface MetricSelectorProps {
  selectedMetrics: Metric[];
  onMetricChange: (metrics: Metric[]) => void;
}

const MetricSelector = ({ selectedMetrics, onMetricChange }: MetricSelectorProps) => {
    const handleMetricChange = (metric: Metric) => {
        const isSelected = selectedMetrics.includes(metric);
        if (!isSelected && selectedMetrics.length >= 2) {
            return;
        }
        const newMetrics = isSelected
            ? selectedMetrics.filter(m => m !== metric)
            : [...selectedMetrics, metric];
        onMetricChange(newMetrics);
    };

    return (
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
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleMetricChange(key)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MetricSelector;
