
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const reports = [
  {
    title: "Annual Energy Outlook 2024",
    description: "An in-depth analysis of energy production and consumption trends, featuring an interactive heatmap of regional energy usage.",
    link: "/reports/energy-report-1",
  },
  {
    title: "Renewable Energy Market Update",
    description: "Exploring the growth of solar, wind, and other renewable sources with detailed interactive charts.",
    link: "/reports/energy-report-2",
  },
  {
    title: "Future of Electric Vehicles",
    description: "A comprehensive report on the EV market, battery technology, and charging infrastructure projections.",
    link: "/reports/energy-report-3",
  },
];

const Reports = () => {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <PageHeader title="Energy Reports" />
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Link to={report.link} key={report.title} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 group-hover:border-primary">
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between">
                <span className="text-sm font-medium text-primary">View Report</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Reports;
