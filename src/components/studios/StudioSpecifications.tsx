import { Clock, Users, Ruler, Camera } from 'lucide-react';

interface StudioSpecificationsProps {
  specifications: {
    size: string;
    capacity: number;
    availableHours: string;
    equipment: string[];
  };
}

export default function StudioSpecifications({
  specifications,
}: StudioSpecificationsProps) {
  const items = [
    {
      label: 'Studio Size',
      value: specifications.size,
      icon: Ruler,
    },
    {
      label: 'Capacity',
      value: `${specifications.capacity} People`,
      icon: Users,
    },
    {
      label: 'Available Hours',
      value: specifications.availableHours,
      icon: Clock,
    },
    {
      label: 'Equipment',
      value: specifications.equipment.join(', '),
      icon: Camera,
    },
  ];

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Workspace Specifications</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(item => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex gap-4 rounded-xl border p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                <Icon size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 break-words font-semibold">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
