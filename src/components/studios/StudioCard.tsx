import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ArrowUpRight } from 'lucide-react';
import type { Studio } from '@/types/studio';

interface StudioCardProps {
  studio: Studio;
}

export default function StudioCard({ studio }: StudioCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Studio Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={studio.images?.[0] || '/placeholder.jpg'}
          alt={studio.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
          {studio.category}
        </span>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
          <Star size={14} className="fill-yellow-500 text-yellow-500" />
          {studio.rating}
        </div>
      </div>

      {/* Studio Information */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold">{studio.name}</h3>

          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={15} />
            {studio.location.area}, {studio.location.city}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-primary">
              ${studio.hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">
                {' '}
                / hr
              </span>
            </p>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
