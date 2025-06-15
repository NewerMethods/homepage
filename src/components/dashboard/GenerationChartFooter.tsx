
import React from 'react';
import { CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface GenerationChartFooterProps {
  minYear: number;
  maxYear: number;
  yearRange: [number, number];
  onYearRangeChange: (value: [number, number]) => void;
}

const GenerationChartFooter = ({ minYear, maxYear, yearRange, onYearRangeChange }: GenerationChartFooterProps) => {
  return (
    <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
        <Slider
          min={minYear}
          max={maxYear}
          step={1}
          value={yearRange}
          onValueChange={(value) => onYearRangeChange(value as [number, number])}
          className="w-full"
        />
        <p className="text-center text-sm text-muted-foreground mt-2">
          Year Range
        </p>
      </div>
    </CardFooter>
  );
};

export default GenerationChartFooter;
