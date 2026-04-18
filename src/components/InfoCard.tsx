import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  colorClass?: string;
}

export default function InfoCard({ icon: Icon, title, value, colorClass = "text-primary bg-blue-50" }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 p-4 flex gap-3 items-start hover:shadow-md transition-shadow">
      <div className={`rounded-lg p-2.5 shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-sm text-foreground leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
