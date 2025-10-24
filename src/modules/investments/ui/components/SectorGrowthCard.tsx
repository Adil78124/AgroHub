import { Badge } from "@/shared/components/ui";
import { Progress } from "@/shared/components/ui/progress";

interface SectorGrowthCardProps {
  name: string;
  value: string;
  growth: string;
  potential: string;
  progress: number;
}
export const SectorGrowthCard = ({
  name,
  value,
  growth,
  potential,
  progress,
}: SectorGrowthCardProps) => {
  return (
    <section className=" flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="">{name}</h3>
        <Badge variant={"outline"}>{value}</Badge>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{growth}</span>
        <span>{potential}</span>
      </div>
      <Progress value={progress} progressStyles="bg-blue-500" />
    </section>
  );
};
