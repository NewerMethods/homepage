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
import type { DemandSectorType } from '@/types';
import { SECTORS } from '@/config/dashboardConfig';

interface DemandSectorSelectorProps {
  selectedSectors: DemandSectorType[];
  onSectorChange: (sectors: DemandSectorType[]) => void;
}

const DemandSectorSelector = ({ selectedSectors, onSectorChange }: DemandSectorSelectorProps) => {
    const handleSectorChange = (sector: DemandSectorType) => {
        const newSectors = selectedSectors.includes(sector)
            ? selectedSectors.filter(s => s !== sector)
            : [...selectedSectors, sector];
        onSectorChange(newSectors);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Demand Sectors ({selectedSectors.length})</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Demand Sectors</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SECTORS.map(({key, label}) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={selectedSectors.includes(key)}
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleSectorChange(key)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DemandSectorSelector;
