
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimeframeCardProps {
  from: string;
  to: string;
}

const TimeframeCard = ({ from, to }: TimeframeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Data Timeframe</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">From: {new Date(from).toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">To: {new Date(to).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default TimeframeCard;
