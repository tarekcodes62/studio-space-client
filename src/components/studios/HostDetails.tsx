import Image from 'next/image';
import { UserRound } from 'lucide-react';

interface HostDetailsProps {
  host?: {
    name: string;
    email?: string;
    image?: string | null;
  };
}

export default function HostDetails({ host }: HostDetailsProps) {
  if (!host) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Hosted By</h2>

      <div className="flex items-center gap-4 rounded-xl border p-5">
        <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-muted">
          {host.image ? (
            <Image
              src={host.image}
              alt={host.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <UserRound size={28} />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold">{host.name}</h3>
          {host.email && (
            <p className="break-all text-sm text-muted-foreground">
              {host.email}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
