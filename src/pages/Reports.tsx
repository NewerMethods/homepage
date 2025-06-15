
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchReportList } from "@/services/reportApi";
import { Skeleton } from "@/components/ui/skeleton";

const Reports = () => {
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reportList'],
    queryFn: fetchReportList
  });

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <PageHeader title="Energy Reports" />
      </header>
      
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between">
                 <Skeleton className="h-6 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">Could not load reports. Please try again later.</div>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports?.map((report) => (
          <Link to={`/reports/${report.slug}`} key={report.title} className="group">
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
