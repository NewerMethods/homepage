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
import type { TechnologyType } from '@/types';
import { TECHNOLOGIES } from '@/config/dashboardConfig';

interface TechnologySelectorProps {
  selectedTechnologies: TechnologyType[];
  onTechnologyChange: (techs: TechnologyType[]) => void;
}

const TechnologySelector = ({ selectedTechnologies, onTechnologyChange }: TechnologySelectorProps) => {
    const handleTechnologyChange = (tech: TechnologyType) => {
        const newTechs = selectedTechnologies.includes(tech)
            ? selectedTechnologies.filter(t => t !== tech)
            : [...selectedTechnologies, tech];
        onTechnologyChange(newTechs);
    };

    return (
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
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleTechnologyChange(key)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TechnologySelector;
