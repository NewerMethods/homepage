
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const DashboardSkeleton = () => (
    <div className="space-y-8">
      <header className="mb-12">
        <Skeleton className="h-12 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </header>
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-48" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[400px]" />
        </CardContent>
      </Card>
    </div>
);

export default DashboardSkeleton;
