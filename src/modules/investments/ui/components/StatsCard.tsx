import { Badge } from "@/shared/components/ui";

interface StatsCardProps {
  title: string;
  value: string;
  tooltip: string;
}
export const StatsCard = ({ stats }: { stats: StatsCardProps }) => {
  return (
    <section className="p-3 border flex-1 ">
      <h3 className="text-sm text-gray-400">{stats.title}</h3>
      <div className="flex  justify-between items-center mt-2">
        <p className="text-xl  font-semibold">{stats.value}</p>
        <Badge variant="outline">{stats.tooltip}</Badge>
      </div>
    </section>
  );
};
