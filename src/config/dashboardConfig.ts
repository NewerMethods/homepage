
import type { Metric, TechnologyType, DemandSectorType, FuelType } from '@/types';

type DataType = 'supply' | 'demand';

export const DATA_TYPES: { key: DataType; label: string }[] = [
    { key: 'supply', label: 'Supply' },
    { key: 'demand', label: 'Demand' },
];

export const METRICS: { key: Metric; label: string }[] = [
    { key: 'electricity_generation', label: 'Electricity Generation (TWh)' },
    { key: 'installed_capacity', label: 'Installed Capacity (GW)' },
    { key: 'emissions', label: 'Emissions (MtCO2e)' },
];

export const TECHNOLOGIES: { key: TechnologyType; label: string }[] = [
    { key: 'solar', label: 'Solar' },
    { key: 'wind', label: 'Wind' },
    { key: 'gas', label: 'Gas' },
    { key: 'hydro', label: 'Hydro' },
];

export const SECTORS: { key: DemandSectorType; label: string }[] = [
    { key: 'heat_pumps', label: 'Heat Pumps' },
    { key: 'electric_vehicles', label: 'Electric Vehicles' },
    { key: 'industry', label: 'Industry' },
];

export const FUELS: { key: FuelType; label: string }[] = [
    { key: 'electricity', label: 'Electricity' },
    { key: 'hydrogen', label: 'Hydrogen' },
];
