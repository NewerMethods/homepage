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
import type { FuelType } from '@/types';
import { FUELS } from '@/config/dashboardConfig';

interface FuelSelectorProps {
  selectedFuels: FuelType[];
  onFuelChange: (fuels: FuelType[]) => void;
}

const FuelSelector = ({ selectedFuels = [], onFuelChange }: FuelSelectorProps) => {
    const handleFuelChange = (fuel: FuelType) => {
        const newFuels = selectedFuels.includes(fuel)
            ? selectedFuels.filter(f => f !== fuel)
            : [...selectedFuels, fuel];
        onFuelChange(newFuels);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Fuel Types ({selectedFuels.length})</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Fuel Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {FUELS.map(({key, label}) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        checked={selectedFuels.includes(key)}
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleFuelChange(key)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FuelSelector;
