
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IntensityCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  color?: string;
}

export const IntensityCard = ({ title, value, unit, icon: Icon, color }: IntensityCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);
